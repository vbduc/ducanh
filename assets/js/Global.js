const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//Reload to top
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});
//Focus search
$(".search-input").addEventListener("focus", () => {
  $(".search").style.border = "1px solid #6c5ce7";
  $(".suggest").style.opacity = "1";
  $(".suggest").style.visibility = "inherit";
});
$(".search-input").addEventListener("blur", () => {
  $(".search").style.border = "1px solid #b2bec3";
  $(".suggest").style.opacity = "0";
  $(".suggest").style.visibility = "hidden";
});
//Menu
$(".main-header .menu ").addEventListener("click", () => {
  $(".main-header nav").style.opacity = "1"
  $(".main-header nav").style.transform = "translateX(0)"
})
//Close Menu
$(".main-header nav .close-menu").addEventListener("click", () => {
  $(".main-header nav").style.opacity = "0"
  $(".main-header nav").style.transform = "translateX(-100%)"
})
//Child menu
const handleChildMenu = () => {
  const toggleChild = (childElement, isOpen) => {
    childElement.style.height = isOpen ? "0" : "auto";
    return !isOpen;
  };

  let menClothesOpen = false;
  $(".menClothes").addEventListener("click", () => {
    $(".menClothes i").style.transform = menClothesOpen ? "rotate(0)" : "rotate(180deg)"
    $(".menClothes i").style.color = menClothesOpen ? "#333" : "#eb4d4b"
    $(".menClothes a").style.color = menClothesOpen ? "#333" : "#eb4d4b"
    menClothesOpen = toggleChild($(".menClothes-child"), menClothesOpen);
  });

  let womenClothesOpen = false;
  $(".womenClothes").addEventListener("click", () => {
    $(".womenClothes i").style.transform = womenClothesOpen ? "rotate(0)" : "rotate(180deg)"
    $(".womenClothes i").style.color = womenClothesOpen ? "#333" : "#eb4d4b"
    $(".womenClothes a").style.color = womenClothesOpen ? "#333" : "#eb4d4b"
    womenClothesOpen = toggleChild($(".womenClothes-child"), womenClothesOpen);
  });

  let accessoryOpen = false;
  $(".accessory").addEventListener("click", () => {
    $(".accessory i").style.transform = accessoryOpen ? "rotate(0)" : "rotate(180deg)"
    $(".accessory i").style.color = accessoryOpen ? "#333" : "#eb4d4b"
    $(".accessory a").style.color = accessoryOpen ? "#333" : "#eb4d4b"
    accessoryOpen = toggleChild($(".accessory-child"), accessoryOpen);
  });
  let profileOpen = true
  $(".profile").addEventListener("click", () => {
    if (profileOpen) {
      $(".profile-child").style.transform = "translateY(0)"
      $(".profile-child").style.opacity = "1"
      $(".profile-child").style.visibility = "inherit"
      profileOpen = false
    } else {
      $(".profile-child").style.transform = "translateY(20%)"
      $(".profile-child").style.opacity = "0"
      $(".profile-child").style.visibility = "hidden"
      profileOpen = true
    }
  })
}
if (($("body").offsetWidth >= 768 && $("body").offsetWidth <= 1024) || ($("body").offsetWidth >= 320 && $("body").offsetWidth <= 430))//Màn hình tablet và phone thì chạy hàm
{
  handleChildMenu();
}
//Scrooll-header
window.addEventListener("scroll", () => {
  let Y = window.scrollY;
  if (Y >= 350) {
    $("#btn-to-top").style.display = "block";
  } else if (Y >= 40) {
    $(".main-header").style.top = `0`;
  } else if (Y < 40) {
    $(".main-header").style.top = `41px`;
    $("#btn-to-top").style.display = "none";
  }
});
//Hiệu ứng load trang
window.addEventListener("load", function () {
  $(".main-loader").style.display = "flex";
  $("body").style.overflow = "hidden";
  setTimeout(function () {
    $(".main-loader").style.display = "none";
    $("body").style.overflow = "auto";
  }, 1000); // thời gian mô phỏng load
});
//Chuyển hướng đến sản phẩm
const handleClick = (event) => {
  window.location.href = `/src/products.html?id=${event.dataset.id}`;
};
//Search
$(".search-input").addEventListener("change", (e) => {
  $(".search-input").value = e.target.value;
});
$(".search-input").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    window.location.href = `/src/results-search.html?search=${e.target.value}`;
  }
});
// Thêm vào giỏ hàng
const saveProducts = (id, img, name, price, color, size, quantity) => {
  const cartList = JSON.parse(localStorage.getItem("cart")) || [];
  const findProducts = cartList.find(
    (item) => item.id === id && item.color == color && item.size == size
  ); //Nếu id,color,size trùng nhau thì sẽ trả ra phần tử đó
  const pushProduct = () => {
    // Tạo một đối tượng chứa thông tin sản phẩm
    const product = {
      id: id,
      name: name,
      color: color,
      size: size,
      price: price,
      imgSrc: img,
      quantity: quantity,
    };
    cartList.push(product);
  };
  if (findProducts) {
    findProducts.quantity += quantity; //Tăng số lượng sản phẩm
  } else {
    pushProduct();
  }
  localStorage.setItem("cart", JSON.stringify(cartList));
  $(".cart").dataset.count =
    JSON.parse(localStorage.getItem("cart")).length; //Cập nhật khi giỏ hàng được thêm
};
let index = 0;
const handleAddCart = () => {
  $(".add-cart").addEventListener("click", (item) => {
    $(".notice").style = "transform:translateX(0)";
    $(".notice").style.opacity = "1";
    setTimeout(() => {
      $(".notice").style = "transform:translateX(105%)";
      $(".notice").style.opacity = "0";
    }, 2000);
    const id = item.target.dataset.id;
    const img = $(".item-slide-products img").src;
    const name = $(".name").textContent;
    const price = $(".price span").textContent;
    const color = $(".color .active-color").textContent;
    const size = $(".size").value;
    const quantity = parseInt($(".btn_quantity_input").value);
    saveProducts(id, img, name, price, color, size, quantity);
  });
};
if (localStorage.getItem("cart")) {
  $(".cart").dataset.count = JSON.parse(localStorage.getItem("cart")).length || 0; //Set count bằng length của giỏ hàng
}
//Tài khoản
const Account = (data) => {
  const dataAccount = {
    profile: `<div class="user-profile">
    <div><p>Tài khoản:</p> <span>${data.userName}</span></div>
    <div><p>Email:</p> <span>${data.email}</span></div>
    </div>`,
    order: ` <div class="order">
    <h5>Đơn hàng đã mua</h5>
    <div class="main-order">
        <p style="text-align:center;font-size:14px;letter-spacing:3px;">Chưa có đơn hàng nào! <a href="../index.html">Mua ngay</a></p>
    </div>
</div>`,
    changePassword: `<div class="change-password">
      <h2 style="margin-bottom:30px;font-family: system-ui, sans-serif;color:#333;">Thay đổi mật khẩu</h2>
        <div class="main-password">
            <input type="password" placeholder="Nhập mật khẩu hiện tại" class="currentPassword">
            <input type="password" placeholder="Nhập mật khẩu mới" class="newPassword">
            <input type="password" placeholder="Nhập lại mật khẩu mới " class="retypeNewPassword">
        </div>
        <p class="show-password">Hiển thị mật khẩu</p>
        <button class="btn-change-password">Thay đổi</button>
    </div> `,
    address: `<div class="address">
      <div class="main-address">
          <div class="item-address">
              <p>Họ và Tên</p>
              <input type="text" class="name">
          </div>
          <div class="item-address">
              <p>Điện thoại</p>
              <input type="text" class="phone">
          </div>
          <div class="item-address">
              <p>Địa chỉ</p>
              <input type="text" class="address-user">
          </div>
      </div>
      <div class="edit-add-address">
          <p class="edit-address">Sửa</p>
          <buttom class="btn-add-address">Thêm mới</buttom>
      </div>
      </div>`
  }
  const urlParams = new URLSearchParams(window.location.search)
  const toValue = urlParams.get("to")
  $(".user").innerText = data.userName
  $(".card-right").innerHTML = dataAccount[toValue]
  $$(".menu-left li").forEach(item => {
    item.addEventListener("click", (e) => {
      window.location.href = `/src/user.html?to=${e.target.dataset.choose}`
    })
  })
  $$(".menu-left li").forEach(item => {
    if (item.dataset.choose == toValue) {
      item.classList.add("active")
    }
    if (item.dataset.choose != toValue) {
      item.classList.remove("active")
    }
  })
  const name = $(".name")
  const phone = $(".phone")
  const addressUser = $(".address-user")
  const currentPassword = $(".currentPassword")
  const newPassword = $(".newPassword")
  const retypeNewPassword = $(".retypeNewPassword")
  const regexPassword = /^(?=.{6,20}$)[a-zA-Z0-9._]+$/
  const handleOrder = () => {
    const htmls = data.order.map(datas =>
      `
      <div class="item-product-order">
            <div class="item-img">
            <img src=${datas.imgSrc} alt=${datas.color}>
            </div>
            <div class="title-product-order">
                <p class="name-order">${datas.name}</p>
                <p class="color-size-order">${datas.color} / Size: ${datas.size}</p>
                <div class="price-order">Giá : <span>${(parseInt(datas.price) * (datas.quantity)).toLocaleString(
        "vi-VN")}.000đ</span> </div>
            </div>
            <div class="quantity-order">x${datas.quantity}</div>
        </div>     
      `
    )
    $(".main-order").innerHTML = htmls.join("")
  }
  const handleAddressAdd = () => {
    data.main.name = name.value
    data.main.phone = phone.value
    data.main.address = addressUser.value
    localStorage.setItem("currentUser", JSON.stringify(data))
    location.reload()
  }
  const disableInput = (event) => {
    event.preventDefault();
  }
  const editAddress = () => {
    $(".btn-add-address").style = "display:block"
    $(".btn-add-address").innerText = "Lưu"
    $$("input").forEach(item => item.removeEventListener("keydown", disableInput))
    $(".btn-add-address").addEventListener("click", handleAddressAdd)
    $(".card-right input").focus();
  }
  const handleChangePassword = () => {
    if (currentPassword.value == data.password) {
      currentPassword.style = "border: none"
      if (regexPassword.test(newPassword.value)) {
        newPassword.style = "border: none"
        if (retypeNewPassword.value == newPassword.value) {
          retypeNewPassword.style = "border: none"
          data.password = newPassword.value
          localStorage.setItem("currentUser", JSON.stringify(data))
          $$(".card-right input").forEach(item => item.value = "")
          alert("Đã thay đổi mật khẩu")
        } else {
          alert("Mật khẩu không trùng khớp")
          retypeNewPassword.style = "border: 1px solid red"
        }
      } else {
        alert("Mật khẩu phải từ 6 ký tự trở lên và không vượt quá 20 ký tự")
        newPassword.style = "border: 1px solid red"
      }
    } else {
      alert("Mật khẩu không trùng khớp")
      currentPassword.style = "border: 1px solid red"
      $$(".card-right input").forEach(item => {
        if (item.value == "") {
          item.style = "border: 1px solid red"
        }
      })
    }
  }
  let isPassword = true
  const showPassword = () => {
    if (isPassword) {
      $$(".card-right input").forEach(item => item.setAttribute("type", "text"))
      isPassword = false
      $(".show-password").innerText = "Ẩn mật khẩu"
    } else {
      $$(".card-right input").forEach(item => item.setAttribute("type", "password"))
      isPassword = true
      $(".show-password").innerText = "Hiển thị mật khẩu"
    }
  }
  switch (toValue) {
    case "address":
      name.value = data.main.name || ""
      phone.value = data.main.phone || ""
      addressUser.value = data.main.address || ""
      if (name.value && phone.value && addressUser.value) {
        $$(".card-right input").forEach(item => item.addEventListener("keydown", disableInput))
        $(".btn-add-address").style = "display:none"
        $(".edit-address").style.cursor = "pointer"
        $(".edit-address").style.color = " #6c5ce7"
        $(".edit-address").addEventListener("click", editAddress)
      } else {
        $(".btn-add-address").style = "display:block"
        $(".btn-add-address").addEventListener("click", handleAddressAdd)
      }
      break;
    case "changePassword":
      $(".btn-change-password").addEventListener("click", handleChangePassword)
      $(".show-password").addEventListener("click", showPassword)
      break;
    case "order":
      if (data.order.length != 0) {
        handleOrder()
      }
      break;
    default:
      break;
  }
}

// nếu đã đăng nhập sẽ chuyển qua tài khoản và đăng xuất

const account = JSON.parse(localStorage.getItem("currentUser"))
const users = JSON.parse(localStorage.getItem("user"))
if (account) {
  $(".profile-child").innerHTML = `
  <li> <a href="/src/user.html?to=profile">Tài khoản</a> </li>
  <li> <a href="../index.html" class="logout">Đăng xuất</a> </li>`
  if ($(".user")) {
    Account(account)
  }
  const handleLogout = () => {
    users.forEach(user => {
      if (account.userName == user.userName) {
        user.main = account.main
        user.order = account.order
        localStorage.setItem("user", JSON.stringify(users))
        localStorage.removeItem("currentUser")
      }
    })
  }
  $(".logout").addEventListener("click", handleLogout)
}