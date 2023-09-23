import {motion} from 'framer-motion';

export default function Contact() {

    return (
        <>
            <div className="my-5 px-4">
                <h2 className="fw-bold h-font text-center">CONTACT-US</h2>
                <div className="h-line bg-dark"></div>
                <p className="text-center mt-3">
                   If you have any quseation Please feel free to contact us.We will try to do our best.

                </p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 mb-5 px-4 ">
                        <div className="bg-white  p-4 border-top border-4 border-dark ">
                            <div className="bg-white p-4">
                                <iframe className="w-100 mb-4" height="320px" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126762.45837533647!2d80.14577239492183!3d6.851370918698644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253c87cd30f47%3A0x962a24d3843035e1!2sHotel%20Grand%20Mondo%20-%20Luxury%20Banquets!5e0!3m2!1sen!2slk!4v1654782628627!5m2!1sen!2slk"></iframe>
                                <h5 className=" fs-0">Address</h5>
                                <a href="https://goo.gl/maps/fx47oZ8KWYaNiDRM9" className="d-inline-block text-decoration-none text-dark">
                                    <i className="bi bi-geo-alt-fill"></i> HealthLink, No.52, Collombo 07.
                                </a>
                                <hr />

                                <h5 className="mt-3 fs-0">Call us</h5>
                                <a href="tel:0771875764" className="d-inline-block mb-2 text-decoration-none text-dark">   
                                    <i className="bi bi-telephone-fill"></i> +94771875764
                                </a>
                                <hr />

                                <h5 className="mt-3 fs-0">Email</h5>
                                <a href="tel:0771875764" className="d-inline-block mb-2 text-decoration-none text-dark">
                                    <i className="bi bi-envelope-fill"></i> HealthLink@gmail.com
                                </a>
                               
                            </div>
                        </div >
                    </div >
                    <div className="col-lg-6 col-md-6 mb-5 px-4 ">
                        <motion.div  whileHover={{scale:1.1}} className="bg-white  p-4 border-top border-4 border-dark boxShadow1">
                            <form method="POST">
                                <h5 className="mt-3 fs-0">Send a message</h5>
                                <div className="mt-3">
                                    <label className="form-label" style={{fontWeight:'500'}}>Name</label>
                                    <input name="name" required type="text" className="form-control shadow-none" />
                                </div>
                                <div className="mt-3">
                                    <label className="form-label" style={{fontWeight:'500'}}>Email</label>
                                    <input name="email" required type="Email" className="form-control shadow-none" />
                                </div>
                                <div className="mt-3">
                                    <label className="form-label"style={{fontWeight:'500'}}>Subject</label>
                                    <input name="subject" required type="text" className="form-control shadow-none" />
                                </div>
                                <div className="mt-3">
                                    <label className="form-label" style={{fontWeight:'500'}}>Message</label>
                                    <textarea name="message" required className="form-control shadow-none" rows="5"></textarea>
                                </div>
                                <motion.button whileHover={{scale:1.2}}  name="send" type="submit" className=" btn btn-dark shadow-none mt-3">
                                    Send
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                </div >
            </div >
        </>
    )
}