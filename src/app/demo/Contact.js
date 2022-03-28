import React, { Component, useState } from 'react';
import { Form } from 'react-bootstrap';
import { LIST_CATEGORY } from '../../contants/ListCategory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const citiesData = [
  { id: 1, name: 'Hà Nội', value: 'Hà Nội', region: '3' },
  { id: 2, name: 'Ninh Bình', value: 'Ninh Bình', region: '3' },
  { id: 3, name: 'Thái Bình', value: 'Thái Bình', region: '3' },
  { id: 4, name: 'Thanh Hoá', value: 'Thanh Hoá', region: '4' },
  { id: 5, name: 'Nghệ An', value: 'Nghệ An', region: '4' },
  { id: 6, name: 'Hà Tĩnh', value: 'Hà Tĩnh', region: '4' },
  { id: 7, name: 'Hồ Chí Minh', value: 'Hồ Chí Minh', region: '8' },
  { id: 8, name: 'Cà Mau', code: 'Cà Mau', region: '7' },
  { id: 9, name: 'Vũng Tàu', code: 'Vùng Tàu', region: '8' },
];

const wardsData = [
  { id: 1, name: 'Ba Vì', code: 'Ba Vì', city: 'Hà Nội' },
  { id: 2, name: 'Đông Anh', code: 'Đông anh', city: 'Hà Nội' },
  { id: 3, name: 'Thanh Oai', code: 'Thanh Oai', city: 'Hà Nội' },
  { id: 4, name: 'Thạch Thất', code: 'Thạch Thất', city: 'Hà Nội' },
  { id: 5, name: 'Hoa Lư', code: 'Hoa Lư', city: 'Ninh Bình' },
  { id: 6, name: 'Kiến Xương', code: 'Kiến Xương', city: 'Thái Bình' },
  { id: 7, name: 'Thái Thuỵ', code: 'Thái Thuỵ', city: 'Thái Bình' },
  { id: 8, name: 'Bỉm Sơn', code: 'Bỉm Sơn', city: 'Thanh Hoá' },
  { id: 9, name: 'Quận 1', code: 'Quận 1', city: 'Hồ Chí Minh' },
  { id: 10, name: 'Quận 2', code: 'Quận 2', city: 'Hồ Chí Minh' },
];

const Contact = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const [city, setCity] = useState('');
  const [ward, setWard] = useState('');

  const [wards, setWards] = useState([]);

  const handleChangeFullName = (e) => {
    setFullname(e.currentTarget.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.currentTarget.value);
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
    setWard('');
    setWards(wardsData.filter((ward) => ward.city === e.target.value));
  };

  const handleChangeWard = (e) => {
    setWard(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let province = citiesData.find((item) => item.value === city);

    const data = {
      email,
      phone,
      fullName: fullname,
      IdCategory: category,
      contentContact: note,
      address: `${ward}, ${city}`,
      IdRegions: province.region,
    };
    console.log('=====> data nè', data);
    toast.success('Gửi Thông Tin Thành Công!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      progress: undefined,
    });
    let listCustomer = JSON.parse(localStorage.getItem('customer')) || [];
    listCustomer.unshift(data);
    localStorage.setItem('customer', JSON.stringify(listCustomer));
  };

  return (
    <div className='d-flex align-items-center auth px-0'>
      <ToastContainer />
      <div className='row w-100 mx-0'>
        <div className='col-md-6 mx-auto'>
          <div className='card pt-0'>
            <div className='card-body pt-0 pt-4'>
              <h4 className='card-title' style={{ lineHeight: '28px' }}>
                Nếu bạn có thắc mắc gì muốn được giải đáp vui lòng liên hệ với
                chúng tôi bằng cách điền vào các thông tin bên dưới
              </h4>
              <form className='forms-sample pt-3' onSubmit={handleSubmit}>
                <Form.Group>
                  <label htmlFor='exampleInputUsername1'>Họ Và Tên</label>
                  <Form.Control
                    type='text'
                    id='exampleInputUsername1'
                    placeholder='Họ và tên'
                    size='sm'
                    style={{ borderRadius: '6px' }}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <label htmlFor='exampleInputEmail1'>Email</label>
                  <Form.Control
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    placeholder='Email'
                    size='sm'
                    style={{ borderRadius: '6px' }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <label htmlFor='exampleInputEmail1'>Điện thoại</label>
                  <Form.Control
                    type='text'
                    className='form-control'
                    id='exampleInputEmail1'
                    placeholder='Điện thoại'
                    size='sm'
                    style={{ borderRadius: '6px', height: '2.575rem' }}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <div className='row'>
                  <div className='col-6'>
                    <Form.Group>
                      <label htmlFor='exampleFormControlSelect2'>
                        Tỉnh/Thành Phố <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select
                        className='form-control'
                        id='exampleFormControlSelect2'
                        size='sm'
                        style={{ borderRadius: '6px', height: '2.575rem' }}
                        required
                        name='city'
                        value={city}
                        onChange={handleChangeCity}
                      >
                        <option disabled value=''>
                          Chọn tỉnh thành
                        </option>
                        {citiesData.map((city) => (
                          <option value={city.value} key={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>
                  <div className='col-6'>
                    <Form.Group required>
                      <label>
                        Quận/Huyện <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select
                        className='form-control'
                        size='sm'
                        style={{ borderRadius: '6px', height: '2.575rem' }}
                        name='ward'
                        value={ward}
                        onChange={handleChangeWard}
                      >
                        <option disabled value=''>
                          Chọn quận/huyện
                        </option>
                        {wards.map((ward) => (
                          <option value={ward.value} key={ward.id}>
                            {ward.name}
                          </option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>
                </div>

                <Form.Group>
                  <label htmlFor='exampleFormControlSelect3'>
                    Hạng mục thi công
                  </label>
                  <select
                    name='category'
                    value={category}
                    className='form-control'
                    id='exampleFormControlSelect3'
                    size='sm'
                    style={{ borderRadius: '6px', height: '2.575rem' }}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled value=''>
                      Chọn hạng mục thi công
                    </option>
                    {LIST_CATEGORY.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>

                <Form.Group>
                  <label htmlFor='exampleTextarea1'>Textarea</label>
                  <textarea
                    className='form-control p-2'
                    id='exampleTextarea1'
                    rows='4'
                    style={{ borderRadius: '6px' }}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </Form.Group>

                <div className='row'>
                  <div className='col d-flex align-items-center justify-content-center'>
                    <button
                      type='submit'
                      className='btn btn-gradient-success btn-rounded mr-2'
                      style={{ width: '200px' }}
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
