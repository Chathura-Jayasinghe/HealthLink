
import { SliderMain } from './sideComps/collection'
import { FilterSectionMainPage,DoctorSectionDefault } from './sideComps/filterSections';
import {useState } from 'react';

function Home(props) {

     const [doctorFilter,setDoctorFilter]=useState(null)

    
    return (
        <>
            <SliderMain />
            <FilterSectionMainPage  setDoctorFilter={setDoctorFilter}/>
            <DoctorSectionDefault doctorFilter={doctorFilter} setLoginPop={props.setLoginPop}/>

        </>
    )

}

export default Home;