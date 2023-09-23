
import { FilterSectionDoctorPage, DoctorSectionDoctorPage } from './sideComps/filterSections';
import { useEffect, useState } from 'react';

function Doctors(props) {

    const [doctorFilter, setDoctorFilter] = useState(null)


    return (
        <>
            <div class="my-5 px-4">
                <h2 class="fw-bold h-font text-center">ALL DOCTORS</h2>
                <div class="h-line bg-dark"></div>
            </div>

            <div class="container m-auto">
                <div class="row mb-5">
                    <FilterSectionDoctorPage setDoctorFilter={setDoctorFilter} />
                    <DoctorSectionDoctorPage setLoginPop={props.setLoginPop}  doctorFilter={doctorFilter}/>
                </div>
            </div>

        </>
    )

}

export default Doctors;