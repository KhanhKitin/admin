import React, { useEffect, useCallback, useState } from 'react';
import { Modal } from 'react-bootstrap';

const filterByRole = (role, listUser = []) => {
  if (role === 'GIAM_DOC') {
    return listUser.filter((e) => e.role === 'TRUONG_PHONG');
  }
  if (role === 'TRUONG_PHONG') {
    return listUser.filter((e) => e.role === 'NHAN_VIEN');
  }
};
const showRole = (role) => {
  if (role === 'NHAN_VIEN') return 'Nhân viên';
  if (role === 'TRUONG_PHONG') return 'Trưởng phòng';
};
const ModalAssign = ({
  show,
  onHide,
  userModalInfor,
  userInfor,
  listUser,
  setListUser,
  setUserModalInfor,
}) => {
  const handleSave = () => {
    setListUser(listUser);
    localStorage.setItem('list_user', JSON.stringify([...listUser]));
    onHide();
  };
  const onCloseModal = () => {
    onHide();
  };
  const onChangeChecked = (e, type, checked, id, name) => {
    if (type === 'region') {
      let newRegion = userModalInfor?.idRegions;
      if (checked) {
        newRegion = newRegion.filter((re) => re.id !== id);
      } else {
        newRegion.push({
          id,
          name,
        });
      }
      const newUserModalInfor = {
        ...userModalInfor,
        idRegions: [...newRegion],
      };
      const newUserId = listUser.findIndex(
        (user) => newUserModalInfor.id === user.id
      );
      listUser[newUserId] = newUserModalInfor;
      setUserModalInfor(newUserModalInfor);
    }
    if (type === 'category') {
      let newCategory = userModalInfor?.idCategory;
      if (checked) {
        newCategory = newCategory.filter((re) => re.id !== id);
      } else {
        newCategory.push({
          id,
          name,
        });
      }
      const newUserModalInfor = {
        ...userModalInfor,
        idCategory: [...newCategory],
      };
      const newUserId = listUser.findIndex(
        (user) => newUserModalInfor.id === user.id
      );
      listUser[newUserId] = newUserModalInfor;
      setUserModalInfor(newUserModalInfor);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Thông tin nhân viên</h4>
          <div>
            <p>Họ và tên: {userModalInfor?.fullName}</p>
            <p>Email: {userModalInfor?.email}</p>
            <p>Chức vụ: {showRole(userModalInfor?.role)}</p>
            <div>
              <div>Quản lý các công trình</div>
              <div className="d-flex flex-wrap row m-0 mt-1">
                {userInfor?.idCategory?.map((e, i) => {
                  const checked =
                    userModalInfor?.idCategory?.some((re) => re.id === e.id) ||
                    false;
                  return (
                    <div
                      key={i}
                      className="form-check form-check-success col-6"
                    >
                      <label className="form-check-label">
                        <input
                          onChange={(event) =>
                            onChangeChecked(
                              event,
                              'category',
                              checked,
                              e.id,
                              e.name
                            )
                          }
                          type="checkbox"
                          className="form-check-input"
                          checked={checked}
                        />
                        {e.name}
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-3">
              <div>Quản lý vùng</div>
              <div className="d-flex flex-wrap row m-0 mt-1">
                {userInfor?.idRegions?.map((e, i) => {
                  const checked =
                    userModalInfor?.idRegions?.some((re) => re.id === e.id) ||
                    false;
                  return (
                    <div
                      key={i}
                      className="form-check form-check-success col-6"
                    >
                      <label className="form-check-label">
                        <input
                          onChange={(event) =>
                            onChangeChecked(
                              event,
                              'region',
                              checked,
                              e.id,
                              e.name
                            )
                          }
                          name={e.id}
                          type="checkbox"
                          className="form-check-input"
                          checked={checked}
                        />
                        {e.name}
                        <i className="input-helper"></i>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            type="button"
            className="btn btn-success btn-fw btn-sm"
          >
            Lưu
          </button>
        </div>
      </div>
    </Modal>
  );
};

const User = () => {
  const userInfor = JSON.parse(localStorage.getItem('user'));
  const [showModal, setShowModal] = useState(false);
  const [userModalInfor, setUserModalInfor] = useState({});
  const [listUser, setListUser] = useState(
    JSON.parse(localStorage.getItem('list_user'))
  );
  const handleShowModal = (e) => {
    setUserModalInfor(e);
    setShowModal(true);
  };

  const handleHideModal = useCallback(() => {
    setListUser(JSON.parse(localStorage.getItem('list_user')));
    setShowModal(false);
  }, [setShowModal]);

  return (
    <div>
      <ModalAssign
        show={showModal}
        onHide={handleHideModal}
        userModalInfor={userModalInfor}
        userInfor={userInfor}
        listUser={listUser}
        setListUser={setListUser}
        setUserModalInfor={setUserModalInfor}
      />
      {/* <div className="page-header">
        <h3 className="page-title"> Nhân viên </h3>
       
      </div> */}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> Nhân viên </h4>
              {/* <p className="card-description">
            
                Add className <code>.table-striped</code>
              </p> */}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> Ảnh đại diện</th>
                      <th> Họ và tên</th>
                      <th> Email </th>
                      <th> Chức vụ </th>
                      <th> Phân bổ </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterByRole(userInfor.role, listUser).map((e, i) => {
                      return (
                        <tr key={i}>
                          <td className="py-1">
                            <img
                              src={require('../../assets/images/faces/face1.jpg')}
                              alt="user icon"
                            />
                          </td>
                          <td> {e.fullName} </td>
                          <td>{e.email}</td>
                          <td>{showRole(e.role)} </td>
                          <td>
                            <button
                              onClick={() => handleShowModal(e)}
                              type="button"
                              className="btn btn-gradient-success btn-rounded btn-icon"
                            >
                              <i className="mdi mdi-map-marker"></i>
                            </button>
                          </td>
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
    </div>
  );
};

export default User;
