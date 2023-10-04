//Lấy giá trị queryString từ URL hiện tại của trang
const queryString = window.location.search;
// new URLSearchParams cho phép tìm kiếm,sửa,xóa trong queryString
const urlParams = new URLSearchParams(queryString);
//Lấy giá trị mang tên status
const statusValue = urlParams.get("status");
const typeValue = urlParams.get("type");
const categoryValue = urlParams.get("category");
const id = urlParams.get("id");
const search = urlParams.get("search");
//Giải mã kí tự đặc biệt
const searchValue = decodeURIComponent(search);

//Page More
const moreStatus = () => {
  fetch(`https://api-fashion.vercel.app/products?status=${statusValue}`)
    .then((res) => res.json())
    .then((datas) => {
      const htmls = datas.map((data) => {
        return `
              <div class="item-products" data-id=${data.id
          } onclick="handleClick(this)">
                            <img src=${data.main[0].images
          } alt="" class="item-img">
                            <p class="name">${data.name}</p>
                            <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
            "vi-VN"
          )}</span></p>
                </div>
              `;
      });
      $(".content").innerHTML = htmls.join("");
    });
  //Thay đổi status
  const titleMore = {
    bestseller: "Bán chạy nhất",
    sale: "Sale 60%",
    favourite: "Yêu thích",
  };
  $(".main-content h1").innerHTML = titleMore[statusValue];
  document.title = `${titleMore[statusValue]} | Hoàng Anh`;
};

//Page Clothes

const createElement = () => {
  fetch(
    `https://api-fashion.vercel.app/products?type=${typeValue}&category=${categoryValue}`
  )
    .then((res) => res.json())
    .then((datas) => {
      const CreateProduct = (datas) => {
        //Hàm CretaProduct tạo ra để dùng tái sử dụng khi sắp xếp theo giá , sắp xếp tăng dần
        const htmls = datas.map((data) => {
          return `
              <div class="item-products" data-id=${data.id
            } onclick="handleClick(this)">
                            <img src=${data.main[0].images
            } alt="" class="item-img">
                            <p class="name">${data.name}</p>
                            <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
              "vi-VN"
            )}</span></p>
                </div>
              `;
        });
        $(".content-clothes").innerHTML = htmls.join("");
        if (datas.length == 0) {
          $(".content-clothes").innerHTML = "Không có sản phẩm với giá tiền này"
        }
      };
      CreateProduct(datas); //Truyền data được lấy từ api cho Create Product
      //Thay đổi status
      //Sử dụng mảng để lưu các keywords về product
      const changeTitle = () => {
        const titleMap = {
          shirt: "Áo sơ mi",
          polo: "Áo polo",
          Tshirt: "Áo thun",
          short: "Quần short",
          jean: "Quần jean",
          kaki: "Quần kaki",
          "short-shirt": "Áo sơ mi",
          hoodie: "Áo hoodie",
          skirt: "Váy",
          trousers: "Quần nữ",
        };
        $(".title-content h1").innerHTML = titleMap[typeValue]; // TypeValue được trả về từ URL paramas khi typeValue bằng keywords trong object thì sẽ lấy ra giá trị đó vào thêm vào thẻ h1
        document.title = ` ${titleMap[typeValue]} | Hoàng Anh `; //Thay đổi tiêu đề trang web
      };
      //Sử dụng select để sắp xếp
      const arrangeData = () => {
        const defaultData = [...datas];
        $("#select").addEventListener("change", (e) => {
          switch (e.target.value) {
            case "increase":
              CreateProduct(datas.sort((a, b) => a.price - b.price)); //Sắp xếp tăng dần truyền biến cho CreateProduct
              break;
            case "reduce":
              CreateProduct(datas.sort((a, b) => b.price - a.price)); //Sắp xếp giảm dần  truyền biến cho CreateProduct
              break;
            default:
              CreateProduct(defaultData);
              break;
          }
        });
      };

      // Sắp xếp theo giá
      const arrangePrice = () => {
        $$("input[type=checkbox]").forEach((checkboxs) => {
          checkboxs.addEventListener("change", () => { });
        });
        // // Tạo một mảng chứa các điều kiện lọc sản phẩm
        const filterConditions = [
          { value: "0-100000", filter: (item) => item.price < 100000 },
          {
            value: "100000-300000",
            filter: (item) => item.price >= 100000 && item.price <= 300000,
          },
          {
            value: "300000-500000",
            filter: (item) => item.price >= 300000 && item.price <= 500000,
          },
          {
            value: "500000-1000000",
            filter: (item) => item.price >= 500000 && item.price < 1000000,
          },
        ];

        // Tạo một hàm lọc sản phẩm
        $$("input[type=checkbox]").forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            {
              // Lấy danh sách các giá trị được chọn
              const checkedValues = Array.from($$("input[type=checkbox]"))
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.dataset.price);

              // Nếu không có giá trị nào được chọn, hiển thị toàn bộ danh sách sản phẩm
              if (checkedValues.length === 0) {
                CreateProduct(datas);
                return;
              }

              // Lọc danh sách sản phẩm dựa trên các giá trị được chọn
              const filteredProducts = datas.filter((item) =>
                checkedValues.some((value) =>
                  filterConditions
                    .find((condition) => condition.value === value)
                    ?.filter(item)
                )
              );
              // Hiển thị danh sách sản phẩm đã lọc
              CreateProduct(filteredProducts);
            }
          });
        });
      };
      const switchFilter = () => {
        $(".btn-filter").addEventListener("click", () => {
          $(".filter-price").style.opacity = "1"
          $(".filter-price").style.transform = "translateX(0)"
        })
        $(".close-filter").addEventListener("click", () => {
          $(".filter-price").style.opacity = "0"
          $(".filter-price").style.transform = "translateX(110%)"
        })
      }
      changeTitle();
      arrangeData();
      arrangePrice();
      switchFilter();
    });
};
const infoProducts = () => {
  fetch(`https://api-fashion.vercel.app/products?id=${id}`)
    .then((res) => res.json())
    .then((datas) => {
      const renderProducts = () => {
        $(".item-slide-products img").src = datas[0].main[0].images;
        $(".name").innerHTML = datas[0].name;
        $(".add-cart").dataset.id = datas[0].id;
        $(".price span").innerHTML = datas[0].price.toLocaleString("vi-VN");
        //Render Size
        const size = datas[0].size.map(
          (dataSize) =>
            `<option value=${dataSize.title}>${dataSize.title}</option>`
        );
        $(".size").innerHTML = size.join("");
        //Render Color
        const color = datas[0].main.map(
          (dataColor) =>
            `<div class="item-color">
      <img src=${dataColor.images}
          alt="">
      ${dataColor.color}
      </div>`
        );
        $(".color").innerHTML = color.join("");
        $(".item-color").classList.add("active-color"); //Thêm class active-color
        //Render item-images-products
        const itemImages = datas[0].main.map(
          (dataImg) =>
            `<div class="item-images-products"><img
      src=${dataImg.images}
      alt=${dataImg.color}></div>`
        );
        $(".btn-images-products").innerHTML = itemImages.join("");
        $(".item-images-products").setAttribute("id", "active-products"); //Thêm id active-products
        document.title = `${datas[0].name}`; //Thay đổi tiêu đề trang web
      };
      const handleNextPrev = () => {
        let index = 0;
        $(".next-slide-products").addEventListener("click", () => {
          index++;
          if (index >= datas[0].main.length - 1) {
            index = datas[0].main.length - 1;
          }
          $(".item-slide-products img").src = datas[0].main[index].images;
          $$(".item-images-products")[index - 1].setAttribute("id", " ");
          $$(".item-images-products")[index].setAttribute(
            "id",
            "active-products"
          );
        });
        $(".prev-slide-products").addEventListener("click", () => {
          index--;
          if (index <= 0) {
            index = 0;
          }
          $(".item-slide-products img").src = datas[0].main[index].images;
          $$(".item-images-products")[index + 1].setAttribute("id", " ");
          $$(".item-images-products")[index].setAttribute(
            "id",
            "active-products"
          );
        });
        const handleClickChangeSile = () => {
          $$(".item-images-products").forEach((itemImages) => {
            itemImages.addEventListener("click", (img) => {
              $(".item-slide-products img").src = img.target.src;
              $$(".item-images-products").forEach((item) => {
                item.setAttribute("id", "");
              });
              itemImages.setAttribute("id", "active-products");
              index = Array.from($$(".item-images-products")).indexOf(
                itemImages // Sử dụng Array.from để biến $$(".item-images-products") thành 1 array thực thụ . Vì $$(".item-images-products") là một NodeList không dùng được indexOf()
                // Code này dùng để lấy index của một phẩn từ khi được click vào nhăm biết vị trí đang được active giúp hàm handleNextPrev có thể sử dụng next và prev mà không bị lỗi
              );
            });
          });
        };
        const handleClickColorImages = () => {
          $$(".item-color").forEach((itemColors) => {
            const colorImg = itemColors.querySelector("img");
            itemColors.addEventListener("click", () => {
              $(".item-slide-products img").src = colorImg.src;
              $$(".item-color").forEach((itemColor) => {
                itemColor.classList.remove("active-color");
              });
              itemColors.classList.add("active-color");
              index = Array.from($$(".item-color")).indexOf(itemColors); // Sử dụng Array.from để biến $$(".item-images-products") thành 1 array thực thụ . Vì $$(".item-images-products") là một NodeList không dùng được indexOf()
              // Code này dùng để lấy index của một phẩn từ khi được click vào nhăm biết vị trí đang được active giúp hàm handleNextPrev có thể sử dụng next và prev mà không bị lỗi
              $$(".item-images-products").forEach((item) => {
                item.setAttribute("id", "");
              });
              $$(".item-images-products")[index].setAttribute(
                "id",
                "active-products"
              ); //Khi click vào màu đã chọn index sẽ được trả về và active-products sẽ được thực hiện theo index được chỉ định
            });
          });
        };
        handleClickChangeSile();
        handleClickColorImages();
      };
      let valueQuantity = 1;
      $(".btn_quantity_input").addEventListener("input", (e) => {
        if (e.target.value == 0) {
          $(".btn_quantity_input").value = valueQuantity
        }
        if (e.target.value > 99) {
          $(".btn_quantity_input").value = 100
        }
      })
      const handleQuantityClick = () => {
        $(".btn_increment").addEventListener("click", () => {
          valueQuantity++;
          $(".btn_quantity_input").value = valueQuantity;
        });
        $(".btn_decrenment").addEventListener("click", () => {
          valueQuantity--;
          if (valueQuantity <= $(".btn_quantity_input").min) {
            valueQuantity = $(".btn_quantity_input").min;
          }
          $(".btn_quantity_input").value = valueQuantity;
        });
      };
      const handleGeneralProducts = () => {
        fetch(
          `https://api-fashion.vercel.app/products?type=${datas[0].type}&category=${datas[0].category}` //data[0].type và data[0].category được lấy từ api trả về từ hàm renderProducts
        )
          .then((res) => res.json())
          .then((datas) => {
            const filterDuplicate = datas.filter((data) => data.id != id); //Lọc sản phẩm có id trùng với id sản phẩm đang hiển thị
            const htmlGeneral = filterDuplicate.map(
              (data) => `
            <div class="item-general-products">
                        <img src=${data.main[0].images}
                            alt=${data.main[0].color}>
                        <a href="/src/products.html?id=${data.id}" class="btn-option">Xem thêm</a>
                    </div>
            `
            );
            $(".general-products").innerHTML = htmlGeneral.join("");
          });
        $(".next-general").addEventListener("click", () => {
          $(".general-products").scrollLeft +=
            $(".item-general-products").offsetWidth * 2;
          $(".prev-general").style.visibility = "inherit";
        });
        $(".prev-general").addEventListener("click", () => {
          $(".general-products").scrollLeft -=
            $(".item-general-products").offsetWidth * 2;
          if ($(".general-products").scrollLeft <= 0) {
            $(".prev-general").style.visibility = "hidden";
          }
        });
      };
      renderProducts();
      handleNextPrev();
      handleQuantityClick();
      handleGeneralProducts();
      handleAddCart(); //Xử lý sự kiện bên Global.js
    });
};
const ResultsSearch = () => {
  fetch(`https://api-fashion.vercel.app/products?q=${searchValue}`)
    .then((res) => res.json())
    .then((datas) => {
      const resultsSearch = datas.map((data) => {
        return `
              <div class="item-products" data-id=${data.id
          } onclick="handleClick(this)">
                            <img src=${data.main[0].images
          } alt="" class="item-img">
                            <p class="name">${data.name}</p>
                            <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
            "vi-VN"
          )}</span></p>
                </div>
              `;
      });
      $(".results-search").innerHTML = resultsSearch.join("");
      if (datas.length == 0) {
        $(
          ".container h4"
        ).innerHTML = `Không có kết quả nào tìm được với từ khóa: ${searchValue}`;
      } else {
        $(
          ".container h4"
        ).innerHTML = `Có ${datas.length} kết quả tìm được với từ khóa: ${searchValue}`;
      }
      document.title = `${searchValue}-Tìm kiếm`;
    });
};
if (statusValue !== null) {
  moreStatus();
} else if (typeValue !== null && categoryValue !== null) {
  createElement();
} else if (id != null) {
  infoProducts();
} else if (search != null) {
  ResultsSearch();
} else {
  $("body").style.background =
    "url(https://www.makewebeasy.com/th/blog/wp-content/uploads/2019/12/cover.png)";
  $("body").innerHTML = `<a href="../index.html" class="btn-go-home"
  style="position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); text-decoration: none; width: 150px; height: 40px; background: linear-gradient(45deg,#3498db,#9b59b6);color: #fff;border-radius: 10px; text-align: center;line-height: 40px;">GO
  HOME</a>`;
  $("#wrapper").style.display = "none";
}