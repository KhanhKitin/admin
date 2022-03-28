import React, { Component, useEffect, useState } from 'react';
import { LIST_CUSTOMER } from '../../contants/ListCustomer';
import { LIST_CATEGORY } from '../../contants/ListCategory';
import { LIST_REGION } from '../../contants/ListRegion';

const Customer = () => {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    console.log('render');
    handleInitData();
  }, []);

  const handleInitData = () => {
    let arrCustomer = handleArray();
    console.log(arrCustomer)
    setCustomer(arrCustomer);
  };

  return (
    <div>
      <div className='col-lg-12 grid-margin stretch-card'>
        <div className='card pt-0'>
          <div className='card-body pt-3'>
            <h4 className='card-title'>Danh Sách Khách Hàng</h4>
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>HỌ VÀ TÊN</th>
                    <th>PHONE</th>
                    <th>ĐỊA CHỈ</th>
                    <th>VÙNG</th>
                    <th>HẠNG MỤC THI CÔNG</th>
                    <th>EMAIL</th>
                    <th>LỜI NHẮN</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.fullName}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>
                          <label
                            className={`badge badge-${handleColor(
                              item.IdRegions
                            )}`}
                          >
                            {handleZone(item.IdRegions)}
                          </label>
                        </td>
                        <td>{handleConstruction(item.IdCategory)}</td>
                        <td>{item.email}</td>
                        <td>{item.contentContact}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const handleConstruction = (idCategory) => {
  let result = LIST_CATEGORY.find((item) => item.id === idCategory);
  if (!result) return '';
  return result.name;
};
const handleZone = (idZone) => {
  let result = LIST_REGION.find((item) => item.id === idZone);
  if (!result) return '';
  return result.name;
};

const handleColor = (idZone) => {
  let object = {
    1: 'info',
    2: 'warning',
    3: 'success',
    4: 'danger',
    5: 'warning',
    6: 'primary',
    7: 'info',
    8: 'warning',
    default: '',
  };
  return object[idZone] || object['default'];
};

const handleGetRole = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) return null;
  return user.role;
};

const handleArray = () => {
  let arr = JSON.parse(localStorage.getItem('customer')) || [];
  let arrAll = [...arr, ...LIST_CUSTOMER];
  if (handleGetRole() === 'GIAM_DOC') {
    return arrAll;
  }
  if (handleGetRole() === 'TRUONG_PHONG') {
    let user = JSON.parse(localStorage.getItem('user'));
    let result = arrAll.filter(item => {
      if(user.idCategory.some(category => category.id === item.IdCategory) && user.idRegions.some(zone => zone.id === item.IdRegions)){
        return item;
      }
    })
    console.log('====> result', result);
    return result;
  }
  if (handleGetRole() === 'NHAN_VIEN') {
    let user = JSON.parse(localStorage.getItem('user'));
    let result = arrAll.filter(item => {
      if(user.idCategory.some(category => category.id === item.IdCategory) && user.idRegions.some(zone => zone.id === item.IdRegions)){
        return item;
      }
    })
    return result;
  }
};

export default Customer;
