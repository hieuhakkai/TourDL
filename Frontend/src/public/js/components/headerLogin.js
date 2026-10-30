let username = sessionStorage.getItem('username');
let userId = sessionStorage.getItem('userID');
const headerRight = document.querySelector('.header__right') || document.querySelector('.header__content');

// 1. Kiểm tra trạng thái đăng nhập để bật/tắt mục "Tour đã đặt" trên menu
function updateOrdersNavVisibility() {
  const myOrdersNav = document.getElementById('header-nav-my-orders');
  if (!myOrdersNav) return;

  if (username) {
    // Đã đăng nhập: hiển thị mục "Tour đã đặt"
    myOrdersNav.style.setProperty('display', 'inline-block', 'important');
    myOrdersNav.classList.remove('is-hidden');
  } else {
    // Đã đăng xuất / Chưa đăng nhập: ẩn hoàn toàn mục "Tour đã đặt"
    myOrdersNav.style.setProperty('display', 'none', 'important');
    myOrdersNav.classList.add('is-hidden');
  }
}

updateOrdersNavVisibility();
document.addEventListener('DOMContentLoaded', updateOrdersNavVisibility);

if (username && headerRight) {
  let headerButtonBox = document.querySelector('.header__button');
  if (headerButtonBox) {
    headerButtonBox.classList.add('hide');
  }

  // Sử dụng insertAdjacentHTML để không làm mất event listeners của các thẻ khác
  headerRight.insertAdjacentHTML(
    'beforeend',
    `<div class="header__infor-customer">
        <span class="icon">
          <i class="fa-solid fa-user"></i>
        </span>
        <span class="header__infor-customer-name">${username}</span>
        <span class="header__infor-customer-icon">
          <i class="fa-solid fa-caret-down"></i>
        </span>
        <ul class="header__infor-block">
          <li class="header__infor-item">
            <a href="/customer/edit/${userId}" class="header__infor-link">
              <i class="fa-solid fa-user-pen" style="margin-right: 6px;"></i> Chỉnh sửa thông tin
            </a>
          </li>
          <li class="header__infor-item">
            <a href="/my-orders" class="header__infor-link">
              <i class="fa-solid fa-suitcase-rolling" style="margin-right: 6px;"></i> Tour đã đặt
            </a>
          </li>
          <li class="header__infor-item logout">
            <span>Đăng xuất</span>
            <span class="icon__logout" title="Đăng xuất">
              <i class="fa-solid fa-right-from-bracket"></i>
            </span>
          </li>
        </ul>
      </div>`
  );

  // Gắn sự kiện đăng xuất trực tiếp để đảm bảo hoạt động trên mọi trang
  const logoutBtn = headerRight.querySelector('.header__infor-item.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      sessionStorage.clear();
      try {
        if (typeof axios !== 'undefined') {
          await axios.post('http://localhost:3124/api/v1/auth/logout');
        } else {
          await fetch('/api/v1/auth/logout', { method: 'POST' });
        }
      } catch (err) {
        console.error('Lỗi khi đăng xuất:', err);
      }
      window.location.href = '/';
    });
  }
}
