const buttonLogout = document.querySelector('.header__infor-item.logout');

const handleLogout = async () => {
  sessionStorage.clear();
  await axios.post('http://localhost:3124/api/v1/auth/logout');
  window.location.href = '/';
};

const setEventLogout = () => {
  if (!buttonLogout) return;
  buttonLogout.addEventListener('click', handleLogout);
};

setEventLogout();

