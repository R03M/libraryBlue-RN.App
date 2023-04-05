import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotCompanyAlert from '../components/NotCompanyAlert';
import CreateOrSelectCompany from '../components/CreateOrSelectCompany';
import { getAllCompanies } from '../redux/actions';

const NoCompany = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { dataUser } = useSelector((state) => state.user);
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, []);
  
  return (
    <>
      <NotCompanyAlert
        position={dataUser.position}
        setModalVisible={setModalVisible}
      />

      <CreateOrSelectCompany
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        type={dataUser.position}
        idUser={dataUser.id}
        companies={companies.allCompanies}
      />
    </>
  );
};

export default NoCompany;
