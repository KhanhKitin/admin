import React, { Component, useState } from 'react';

const zonesData = [
  { id: 1, name: 'Bắc', code: 'b' },
  { id: 2, name: 'Trung', code: 't' },
  { id: 3, name: 'Nam', code: 'n' },
];

const citiesData = [
  { id: 1, name: 'Hà Nội', code: 'ha_noi', zone: 'b' },
  { id: 2, name: 'Ninh Bình', code: 'ninh_binh', zone: 'b' },
  { id: 3, name: 'Thái Bình', code: 'thai_binh', zone: 'b' },
  { id: 4, name: 'Thanh Hoá', code: 'thanh_hoa', zone: 't' },
  { id: 5, name: 'Nghệ An', code: 'nghe_an', zone: 't' },
  { id: 6, name: 'Hà Tĩnh', code: 'ha_tinh', zone: 't' },
  { id: 7, name: 'Hồ Chí Minh', code: 'ho_chi_minh', zone: 'n' },
  { id: 8, name: 'Cà Mau', code: 'ca_mau', zone: 'n' },
  { id: 9, name: 'Vũng Tàu', code: 'vung_tau', zone: 'n' },
];

const wardsData = [
  { id: 1, name: 'Thanh Oai', code: 'thanh_oai', city: 'ha_noi' },
  { id: 2, name: 'Thạch Thất', code: 'thach_that', city: 'ha_noi' },
  { id: 3, name: 'Hoa Lư', code: 'hoa_lu', city: 'ninh_binh' },
  { id: 4, name: 'Kiến Xương', code: 'kien_xuong', city: 'thai_binh' },
  { id: 5, name: 'Thái Thuỵ', code: 'thai_thuy', city: 'thai_binh' },
  { id: 6, name: 'Bỉm Sơn', code: 'bim_son', city: 'thanh_hoa' },
  { id: 7, name: 'Quận 1', code: 'quan_1', city: 'ho_chi_minh' },
  { id: 5, name: 'Quận 2', code: 'quan_2', city: 'ho_chi_minh' },
];

const categoriesData = [
  { id: 1, name: 'Hạng Mục A', code: 'a' },
  { id: 2, name: 'Hạng Mục B', code: 'b' },
  { id: 3, name: 'Hạng Mục C', code: 'c' },
  { id: 4, name: 'Hạng Mục D', code: 'd' },
];

const Contact = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const [zone, setZone] = useState('');
  const [city, setCity] = useState('');
  const [ward, setWard] = useState('');

  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);

  const handleChangeFullName = (e) => {
    setFullname(e.currentTarget.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.currentTarget.value);
  };

  const handleChangeZone = (e) => {
    setZone(e.currentTarget.value);
    setCities(citiesData.filter((city) => city.zone === e.currentTarget.value));
  };

  const handleChangeCity = (e) => {
    setCity(e.currentTarget.value);
    setWards(wardsData.filter((ward) => ward.city === e.currentTarget.value));
  };

  const handleChangeWard = (e) => {
    setWard(e.currentTarget.value);
  };

  const handleChangesetCategory = (e) => {
    setCategory(e.currentTarget.value);
  };

  const handleChangeNote = (e) => {
    setNote(e.currentTarget.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      fullname,
      email,
      phone,
      category,
      address: { zone, city, ward },
      note,
    };
    console.log(data);
  };

  return (
    <div className='bg-white h-screen flex justify-center items-center'>
      <form
        className='w-3/4 max-w-xl border rounded p-5'
        onSubmit={handleSubmitForm}
      >
        <p className='text-slate-500 mb-5'>
          Nếu bạn có thắc mắc gì muốn được giải đáp vui lòng liên hệ với chúng
          tôi bằng cách điền vào các thông tin bên dưới
        </p>
        <label className='block mb-3'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Full Name
          </span>
          <input
            type='text'
            name='text'
            value={fullname}
            onChange={handleChangeFullName}
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
          />
        </label>
        <label className='block mb-3'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleChangeEmail}
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
          />
        </label>
        <label className='block mb-3'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Phone Number
          </span>
          <input
            type='phone'
            name='phone'
            value={phone}
            onChange={handleChangePhone}
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
          />
        </label>
        <div className='flex justify-between mb-3'>
          <label className='block mr-5'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Vùng
            </span>
            <select
              name='zone'
              value={zone}
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              onChange={handleChangeZone}
            >
              <option disabled value=''>
                Chọn vùng miền
              </option>
              {zonesData.map((zone) => (
                <option key={zone.id} value={zone.code}>
                  {zone.name}
                </option>
              ))}
            </select>
          </label>
          <label className='block mr-5'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Tỉnh/Thành Phố
            </span>
            <select
              name='city'
              value={city}
              onChange={handleChangeCity}
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            >
              <option disabled value=''>
                Chọn tỉnh thành
              </option>
              {cities.map((city) => (
                <option value={city.code} key={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label className='block'>
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Quận/Huyện
            </span>
            <select
              name='zone'
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
              value={ward}
              onChange={handleChangeWard}
            >
              <option disabled value=''>
                Chọn quận/huyện
              </option>
              {wards.map((ward) => (
                <option value={ward.code} key={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className='block mb-3'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Hạng Mục Thi Công
          </span>
          <select
            name='category'
            value={category}
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            onChange={handleChangesetCategory}
          >
            <option disabled value=''>
              Chọn hạng mục thi công
            </option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className='block mb-3'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Note
          </span>
          <textarea
            name='note'
            value={note}
            className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
            onChange={handleChangeNote}
          />
        </label>
        <label className='block'>
          <button
            className='btn btn-secondary btn-block btn-outline'
            type='submit'
          >
            Submit
          </button>
        </label>
      </form>
    </div>
  );
};

export default Contact;
