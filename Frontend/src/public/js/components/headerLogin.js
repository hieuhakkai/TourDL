let username = sessionStorage.getItem('username');
let userId = sessionStorage.getItem('userID');
const headerContainer =
  document.querySelector('.header__right') ||
  document.querySelector('.header__content');

if (username && headerContainer) {
  let headerButtonBox = document.querySelector('.header__button');
  if (headerButtonBox) {
    headerButtonBox.classList.add('hide');
  }

  // Tránh chèn trùng lặp nếu script được gọi nhiều lần
  if (!document.querySelector('.header__infor-customer')) {
    headerContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="header__infor-customer">
        <span class="icon">
          <i class="fa-solid fa-user"></i>
        </span>
        <span class="header__infor-customer-name"> ${username} </span>
        <span class="header__infor-customer-icon">
          <i class="fa-solid fa-caret-down"></i>
        </span>
        <ul class="header__infor-block">
          <li class="header__infor-item">
            <a href="/customer/edit/${userId}" class="header__infor-link"> Chỉnh sửa thông tin </a>
          </li>
          <li class="header__infor-item logout">
            Đăng xuất
            <span class="icon__logout" title="Đăng xuất">
              <i class="fa-solid fa-right-from-bracket"></i>
            </span>
          </li>
        </ul>
      </div>`
    );
  }
}
