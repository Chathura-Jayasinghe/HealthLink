import os
from flask import Flask, request, jsonify
import datetime
import secrets
from flask_cors import CORS
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import cv2
from skimage import io
import numpy as np
import cv2
import base64
import shutil

import tensorflow as tf
import tensorflow.keras.backend as K
from tensorflow.keras.models import load_model
import random
import glob
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import cv2
from skimage import io
import numpy as np


smooth = 1

def tversky(y_true, y_pred):
    y_true_pos = K.flatten(y_true)
    y_pred_pos = K.flatten(y_pred)
    true_pos = K.sum(y_true_pos * y_pred_pos)
    false_neg = K.sum(y_true_pos * (1-y_pred_pos))
    false_pos = K.sum((1-y_true_pos)*y_pred_pos)
    alpha = 0.7
    return (true_pos + smooth)/(true_pos + alpha*false_neg + (1-alpha)*false_pos + smooth)

def focal_tversky(y_true,y_pred):
    y_true = tf.cast(y_true, tf.float32)
    y_pred = tf.cast(y_pred, tf.float32)

    pt_1 = tversky(y_true, y_pred)
    gamma = 0.75
    return K.pow((1-pt_1), gamma)



model = load_model('clf-resnet-weights.hdf5')
seg_model = load_model('ResUNet-segModel-weights.hdf5', custom_objects={'focal_tversky': focal_tversky, 'tversky': tversky})





def prediction(test, model, model_seg):
    mask, image_id, has_mask = [], [], []

    for i in test.image_path:

        img = io.imread(i)
        img = img *1./255.
        img = cv2.resize(img, (256,256))
        img = np.array(img, dtype=np.float64)
        img = np.reshape(img, (1,256,256,3))
        is_defect = model.predict(img)

        if np.argmax(is_defect)==0:
            image_id.append(i)
            has_mask.append(0)
            mask.append('No mask :)')
            continue

        X = np.empty((1,256,256,3))
        img = io.imread(i)
        img = cv2.resize(img, (256,256))
        img = np.array(img, dtype=np.float64)
        img -= img.mean()
        img /= img.std()
        X[0,] = img

        predict = model_seg.predict(X)

        if predict.round().astype(int).sum()==0:
            image_id.append(i)
            has_mask.append(0)
            mask.append('No mask :)')
        else:
            image_id.append(i)
            has_mask.append(1)
            mask.append(predict)

    return pd.DataFrame({'image_path': image_id,'predicted_mask': mask,'has_mask': has_mask})



def generateData(dataPath):
  data_map = []

  dir_name = dataPath.split('/')[-1]
  for filename in os.listdir(dataPath):
      image_path = dataPath + '/' + filename
      data_map.extend([image_path])
  df=pd.DataFrame({"image_path" : data_map})
  return df





def plotAndSave(df_pred):
    fig = plt.figure(figsize=(8, 12))
    gs = gridspec.GridSpec(2, 1, width_ratios=[2], height_ratios=[1, 2])
    subgrid = gridspec.GridSpecFromSubplotSpec(1, 2, subplot_spec=gs[0, 0], height_ratios=[1])
    count=0
    finalData=[]
    for i in range(len(df_pred)) :
        
        if df_pred.has_mask[i] == 1 :
            finalData.append({"name": os.path.basename(df_pred.image_path[i]),"mask":1})
            
            ax1 = plt.subplot(subgrid[0])
            ax2 = plt.subplot(subgrid[1])
            ax4 = plt.subplot(gs[1, 0])


            # Read MRI images
            img = io.imread(df_pred.image_path[i])
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            # Original image
            ax1.imshow(img)
            ax1.set_title('Brain MRI')

            # Predicted mask
            pred = np.array(df_pred.predicted_mask[i]).squeeze().round()
            ax2.imshow(pred)
            ax2.set_title('AI predicted mask')


            img_ = io.imread(df_pred.image_path[i])
            img_ = cv2.cvtColor(img_, cv2.COLOR_BGR2RGB)

            mask = pred == 1
            color = (255, 0, 0)
            img_with_mask = img_.copy()
            img_with_mask[mask] = color
            alpha = 0.4  # You can adjust this value to control the transparency level
            output_img = cv2.addWeighted(img_, 1 - alpha, img_with_mask, alpha, 0)
            ax4.imshow(output_img)
            ax4.title.set_text('MRI with AI predicted mask')

            # # Remove axis labels
            # for ax in axs.ravel():
            #     ax.axis('off')

            plt.tight_layout(pad=2, w_pad=2, h_pad=2)
            # plt.show()
            # Save the plot as a JPEG
            plt.savefig(df_pred.image_path[i], dpi=300, bbox_inches='tight')
            plt.close()
            count += 1
        else:
            finalData.append({"name": os.path.basename(df_pred.image_path[i]),"mask":0})
    return finalData


# import threading


# class Plotter(threading.Thread):
#     def __init__(self, image_path, predicted_mask):
#         super().__init__()
#         self.image_path = image_path
#         self.predicted_mask = predicted_mask

#     def run(self):
#         img = io.imread(self.image_path)
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

#         # Predicted mask
#         pred = np.array(self.predicted_mask).squeeze().round()

#         img_ = io.imread(self.image_path)
#         img_ = cv2.cvtColor(img_, cv2.COLOR_BGR2RGB)

#         mask = pred == 1
#         color = (255, 0, 0)
#         img_with_mask = img_.copy()
#         img_with_mask[mask] = color
#         alpha = 0.4  # You can adjust this value to control the transparency level
#         output_img = cv2.addWeighted(img_, 1 - alpha, img_with_mask, alpha, 0)

#         # Save the plot as a JPEG
#         cv2.imwrite(self.image_path, output_img)

# def plotAndSaveMultithreaded(df_pred):
#     threads = []
#     for i in range(len(df_pred)):
#         if df_pred.has_mask[i] == 1:
#             thread = Plotter(df_pred.image_path[i], df_pred.predicted_mask[i])
#             threads.append(thread)
#             thread.start()

#     for thread in threads:
#         thread.join()





def encode_image_to_base64(image_path):
    with open(image_path, 'rb') as image_file:
        image_data = base64.b64encode(image_file.read()).decode('utf-8')
    return image_data











app = Flask(__name__)
CORS(app)
@app.route('/image-upload', methods=['POST', 'OPTIONS'])
def image_upload():
    try:
        if request.method == 'OPTIONS':
            # Respond to CORS preflight request
            response = app.make_default_options_response()
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response.headers['Access-Control-Allow-Methods'] = 'POST'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
            return response

    
        # try:
        uploaded_files = request.files.getlist('files')
        
        # Generate folder name and create directory
        timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
        random_string = secrets.token_hex(5)
        folder_name = f'{timestamp}_{random_string}'
        pathname = "input/" + folder_name
        os.makedirs(pathname)

        for file in uploaded_files:
            saveDir = os.path.join(pathname, file.filename)
            file.save(saveDir)
        dfData=generateData(pathname)
        df_pred = prediction(dfData, model, seg_model)
        
        finalData=plotAndSave(df_pred)
        for data in finalData:
            image_path = os.path.join(pathname, data["name"])
            if os.path.exists(image_path):
                image_data = encode_image_to_base64(image_path)
                data["image"]=image_data

        # plotAndSaveMultithreaded(df_pred)

        try:
            shutil.rmtree(pathname)
        except Exception as e:
            pass
    
        return jsonify(finalData), 201
    except Exception as e:
        return 'Error: {}'.format(str(e)), 250

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,threaded=False)
