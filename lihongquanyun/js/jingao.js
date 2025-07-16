// 安全保护代码
  // 1. 禁用右键和开发者工具快捷键
  document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      showWarning("右键菜单已被禁用");
  });
  								
  document.addEventListener('keydown', function(e) {
      // 禁用F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') || 
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
          showWarning("开发者工具快捷键已被禁用");
      }
  });
  								
  // 2. 开发者工具检测
  let devtoolsOpen = false;
  
  // 方法1: 检查窗口大小变化
  const devtoolsWidthThreshold = window.outerWidth - window.innerWidth > 160;
  const devtoolsHeightThreshold = window.outerHeight - window.innerHeight > 160;
  
  if (devtoolsWidthThreshold || devtoolsHeightThreshold) {
      devtoolsOpen = true;
  }
  
  // 方法2: debugger检测
  setInterval(function() {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();
      
      if (endTime - startTime > 100) {
          devtoolsOpen = true;
      }
      
      if (devtoolsOpen) {
          document.getElementById('devtoolsWarning').style.display = 'block';
          // 可以添加更严厉的措施，如跳转或清除内容
          // document.body.innerHTML = '<h1>请勿使用开发者工具</h1>';
          // window.location.href = '/';
      }
  }, 1000);
  								
  // 3. 反调试技巧
  function antiDebugging() {
      const startTime = new Date().getTime();
      
      // 检测调试器
      (function() {
          const dummy = function() {};
          dummy.toString = function() {
              document.getElementById('devtoolsWarning').style.display = 'block';
              return 'debugger';
          };
          
          console.log('%c', dummy);
      })();
      
      // 检测执行时间
      const endTime = new Date().getTime();
      if (endTime - startTime > 100) {
          showWarning("检测到调试行为");
      }
  }
  
  setInterval(antiDebugging, 5000);
  								
  // 辅助函数
  function showWarning(message) {
      const warning = document.getElementById('devtoolsWarning');
      warning.textContent = message;
      warning.style.display = 'block';
      
      setTimeout(function() {
          warning.style.display = 'none';
      }, 3000);
  }
  								
  // 初始化AOS动画库
  AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 120
  });
  								    
  // 用户登录状态
  let isLoggedIn = false;
  let currentUser = null;
  
  // 购物车数据
  let cart = [];
  
  // DOM元素
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const searchBtn = document.getElementById('searchBtn');
  const searchPanel = document.getElementById('searchPanel');
  const closeSearch = document.getElementById('closeSearch');
  const userBtn = document.getElementById('userBtn');
  const userMenu = document.getElementById('userMenu');
  const loginBtn = document.getElementById('loginBtn');
  const profileBtn = document.getElementById('profileBtn');
  const ordersBtn = document.getElementById('ordersBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileUserMenu = document.getElementById('mobileUserMenu');
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartNotLogin = document.getElementById('cartNotLogin');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartHasItems = document.getElementById('cartHasItems');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartShipping = document.getElementById('cartShipping');
  const cartDiscount = document.getElementById('cartDiscount');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartLoginBtn = document.getElementById('cartLoginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const backToTop = document.getElementById('backToTop');
  const loginToast = document.getElementById('loginToast');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  const productWishBtns = document.querySelectorAll('.product-wish');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const video = document.getElementById('litchiVideo');
  const playBtn = document.getElementById('playBtn');
  const floatModal = document.getElementById('floatModal');
  const closeFloatModal = document.getElementById('closeFloatModal');
  const floatBtn = document.querySelector('.fixed.bottom-8.left-0');
  
  // 视频播放控制（点击播放，默认显示暂停状态）
  playBtn.addEventListener('click', () => {
      video.muted = false; // 取消静音（如需默认静音可改为true）
      video.play();
      playBtn.style.display = 'none'; // 播放后隐藏按钮（如需保留可删除此行）
  });
  
  // 浮动客服按钮
  floatBtn.addEventListener('click', (e) => {
      if (e.target.closest('img') || e.target.closest('.flex.items-center')) {
          floatModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
      }
  });
  
  closeFloatModal.addEventListener('click', function(e) {
      e.stopPropagation();
      floatModal.classList.add('hidden');
      document.body.style.overflow = '';
  });
  
  floatModal.addEventListener('click', function(e) {
      if (e.target === floatModal) {
          floatModal.classList.add('hidden');
          document.body.style.overflow = '';
      }
  });
  
  // 导航栏滚动效果
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll <= 0) {
          navbar.classList.remove('shadow-md', 'bg-white/90');
          navbar.classList.add('bg-white/90');
      } else if (currentScroll > lastScroll) {
          // 向下滚动
          navbar.classList.add('shadow-md', 'bg-white/90');
          navbar.classList.remove('-translate-y-full');
      } else {
          // 向上滚动
          navbar.classList.remove('-translate-y-full');
      }
      
      lastScroll = currentScroll;
      
      // 返回顶部按钮
      if (currentScroll > 100) {
          backToTop.classList.remove('opacity-0', 'invisible');
          backToTop.classList.add('opacity-100', 'visible');
      } else {
          backToTop.classList.add('opacity-0', 'invisible');
          backToTop.classList.remove('opacity-100', 'visible');
      }
      
      // 视差效果
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
          const speed = parseFloat(element.getAttribute('data-speed')) || 0.3;
          element.style.transform = `translateY(${currentScroll * speed}px)`;
      });
  });
  
  // 返回顶部
  backToTop.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  
  // 移动端菜单
  mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
  });
  
  closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = '';
  });
  
  // 搜索面板
  searchBtn.addEventListener('click', () => {
      searchPanel.classList.remove('translate-y-full');
      document.body.style.overflow = 'hidden';
  });
  
  closeSearch.addEventListener('click', () => {
      searchPanel.classList.add('translate-y-full');
      document.body.style.overflow = '';
  });
  
  // 用户菜单
  userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.toggle('hidden');
  });
  
  // 点击页面其他区域关闭用户菜单
  document.addEventListener('click', () => {
      userMenu.classList.add('hidden');
  });
  
  // 阻止用户菜单内部点击事件冒泡
  userMenu.addEventListener('click', (e) => {
      e.stopPropagation();
  });
  
  // 登录模态框
  loginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
  });
  
  mobileLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      mobileMenu.classList.add('translate-x-full');
  });
  
  cartLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      cartSidebar.classList.add('translate-x-full');
  });
  
  closeLoginModal.addEventListener('click', () => {
      loginModal.classList.add('hidden');
      document.body.style.overflow = '';
  });
  
  // 登录/注册标签切换
  tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('border-primary', 'text-primary');
      tabRegister.classList.remove('border-primary', 'text-primary');
      tabRegister.classList.add('text-gray-500');
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
  });
  
  tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('border-primary', 'text-primary');
      tabLogin.classList.remove('border-primary', 'text-primary');
      tabLogin.classList.add('text-gray-500');
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
  });
  
  // 模拟登录
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      isLoggedIn = true;
      currentUser = {
          name: '张先生',
          email: 'user@example.com',
          phone: '13800138000'
      };
      
      // 更新用户界面
      updateUserUI();
      
      // 关闭模态框
      loginModal.classList.add('hidden');
      document.body.style.overflow = '';
      
      // 显示登录成功提示
      showToast('登录成功！欢迎登录');
  });
  
  // 模拟注册
  registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      isLoggedIn = true;
      currentUser = {
          name: '新用户',
          email: 'newuser@example.com',
          phone: document.getElementById('registerPhone').value || ''
      };
      // 更新用户界面
      updateUserUI();
      // 关闭模态框
      loginModal.classList.add('hidden');
      document.body.style.overflow = '';
      // 显示注册成功提示
      showToast('注册成功！欢迎加入');
  });
  
  // 更新用户界面
  function updateUserUI() {
      if (isLoggedIn) {
          loginBtn.classList.add('hidden');
          profileBtn.classList.remove('hidden');
          ordersBtn.classList.remove('hidden');
          logoutBtn.classList.remove('hidden');
          // 移动端
          mobileLoginBtn.classList.add('hidden');
          mobileUserMenu.classList.remove('hidden');
          // 购物车
          updateCartUI();
      } else {
          loginBtn.classList.remove('hidden');
          profileBtn.classList.add('hidden');
          ordersBtn.classList.add('hidden');
          logoutBtn.classList.add('hidden');
          // 移动端
          mobileLoginBtn.classList.remove('hidden');
          mobileUserMenu.classList.add('hidden');
          // 购物车
          updateCartUI();
      }
  }
  
  // 退出登录
  logoutBtn.addEventListener('click', () => {
      isLoggedIn = false;
      currentUser = null;
      cart = [];
      updateUserUI();
      showToast('您已退出登录');
  });
  
  // 购物车按钮
  cartBtn.addEventListener('click', () => {
      cartSidebar.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
      updateCartUI();
  });
  
  closeCartBtn.addEventListener('click', () => {
      cartSidebar.classList.add('translate-x-full');
      document.body.style.overflow = '';
  });
  
  // 添加到购物车
  addToCartBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          if (!isLoggedIn) {
              showToast('请先登录后再进行操作');
              return;
          }
          const id = btn.getAttribute('data-id');
          const name = btn.getAttribute('data-name');
          const price = parseFloat(btn.getAttribute('data-price'));
          let found = cart.find(item => item.id === id);
          if (found) {
              found.qty += 1;
          } else {
              cart.push({ id, name, price, qty: 1 });
          }
          updateCartUI();
          showToast('已加入购物车');
          
          // 添加动画效果
          btn.innerHTML = '<i class="fa fa-check"></i>';
          setTimeout(() => {
              btn.innerHTML = '<i class="fa fa-plus"></i>';
          }, 1000);
      });
  });
  
  // 更新购物车界面
  function updateCartUI() {
      cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
      if (!isLoggedIn) {
          cartNotLogin.classList.remove('hidden');
          cartEmpty.classList.add('hidden');
          cartHasItems.classList.add('hidden');
          return;
      }
      if (cart.length === 0) {
          cartNotLogin.classList.add('hidden');
          cartEmpty.classList.remove('hidden');
          cartHasItems.classList.add('hidden');
          return;
      }
      cartNotLogin.classList.add('hidden');
      cartEmpty.classList.add('hidden');
      cartHasItems.classList.remove('hidden');
      // 渲染购物车商品
      cartItems.innerHTML = '';
      cart.forEach(item => {
          const div = document.createElement('div');
          div.className = 'flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg';
          div.innerHTML = `
              <div>
                  <div class="font-medium">${item.name}</div>
                  <div class="text-sm text-gray-500">¥${item.price} × ${item.qty}</div>
              </div>
              <div class="flex items-center space-x-2">
                  <button class="decrease-btn bg-gray-200 hover:bg-gray-300 px-2 rounded transition-colors" data-id="${item.id}">-</button>
                  <span>${item.qty}</span>
                  <button class="increase-btn bg-gray-200 hover:bg-gray-300 px-2 rounded transition-colors" data-id="${item.id}">+</button>
                  <button class="remove-btn text-red-500 hover:text-red-700 ml-2 transition-colors" data-id="${item.id}"><i class="fa fa-trash"></i></button>
              </div>
          `;
          cartItems.appendChild(div);
      });
      // 商品合计
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      cartSubtotal.textContent = `¥${subtotal.toFixed(2)}`;
      // 运费与优惠
      let shipping = subtotal >= 299 ? 0 : 20;
      cartShipping.textContent = `¥${shipping.toFixed(2)}`;
      let discount = subtotal >= 299 ? 20 : 0;
      cartDiscount.textContent = `-¥${discount.toFixed(2)}`;
      let total = subtotal + shipping - discount;
      cartTotal.textContent = `¥${total.toFixed(2)}`;
      // 结算按钮状态
      checkoutBtn.disabled = cart.length === 0;
      // 绑定加减和删除
      cartItems.querySelectorAll('.decrease-btn').forEach(btn => {
          btn.addEventListener('click', () => {
              const id = btn.getAttribute('data-id');
              let item = cart.find(i => i.id === id);
              if (item && item.qty > 1) {
                  item.qty -= 1;
              } else {
                  cart = cart.filter(i => i.id !== id);
              }
              updateCartUI();
          });
      });
      cartItems.querySelectorAll('.increase-btn').forEach(btn => {
          btn.addEventListener('click', () => {
              const id = btn.getAttribute('data-id');
              let item = cart.find(i => i.id === id);
              if (item) item.qty += 1;
              updateCartUI();
          });
      });
      cartItems.querySelectorAll('.remove-btn').forEach(btn => {
          btn.addEventListener('click', () => {
              const id = btn.getAttribute('data-id');
              cart = cart.filter(i => i.id !== id);
              updateCartUI();
              showToast('已从购物车移除');
          });
      });
  }
  
  // 结算
  checkoutBtn.addEventListener('click', () => {
      if (!isLoggedIn) {
          showToast('请先登录后再进行操作');
          return;
      }
      if (cart.length === 0) {
          showToast('购物车为空');
          return;
      }
      showToast('结算功能暂未开放，敬请期待！');
  });
  
  // 简单的toast提示
  let toastTimer = null;
  function showToast(msg) {
      loginToast.querySelector('span').textContent = msg;
      loginToast.classList.remove('opacity-0', 'invisible');
      loginToast.classList.add('opacity-100', 'visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
          loginToast.classList.add('opacity-0', 'invisible');
          loginToast.classList.remove('opacity-100', 'visible');
      }, 2000);
  }
  
  // 产品分类切换
  categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          categoryBtns.forEach(b => {
              if (b === btn) {
                  b.classList.add('bg-primary', 'text-white');
                  b.classList.remove('bg-white', 'text-gray-800');
              } else {
                  b.classList.remove('bg-primary', 'text-white');
                  b.classList.add('bg-white', 'text-gray-800');
              }
          });
      });
  });
  
  // 收藏按钮
  productWishBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          if (!isLoggedIn) {
              showToast('请先登录后再进行操作');
              return;
          }
          btn.innerHTML = btn.innerHTML.includes('fa-heart-o') 
              ? '<i class="fa fa-heart text-red-500"></i>'
              : '<i class="fa fa-heart-o"></i>';
          
          if (btn.innerHTML.includes('fa-heart')) {
              showToast('已加入收藏');
          }
      });
  });
  
  // 初始化
  updateUserUI();