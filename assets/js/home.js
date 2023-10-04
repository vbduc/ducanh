// định nghĩa các API
const api1 = "https://api-fashion.vercel.app/products?status=bestseller";
const api2 = "https://api-fashion.vercel.app/products?status=sale";
const api3 = "https://api-fashion.vercel.app/products?status=favourite";
// tạo hàm xử lý yêu cầu API
async function fetchData(api) {
  const response = await fetch(api);
  const data = await response.json();
  return data;
}
// gọi các API và xử lý dữ liệu trả về
(async function () {
  const data1 = await fetchData(api1);
  const data2 = await fetchData(api2);
  const data3 = await fetchData(api3);
  //Render bestseller
  const htmls1 = data1.map((data) => {
    return `
    <div class="item-products" data-id=${data.id} onclick="handleClick(this)">
                  <img src=${data.main[0].images} alt="" class="item-img">
                  <p class="name">${data.name}</p>
                  <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
      "vi-VN"
    )}</span></p>
      </div>
    `;
  });
  $(".bestseller-content").innerHTML =
    $(".bestseller-content").innerHTML + htmls1.join("");
  //Render sale
  const htmls2 = data2.map((data) => {
    return `
    <div class="item-products" data-id=${data.id} onclick="handleClick(this)">
                  <img src=${data.main[0].images} alt="" class="item-img">
                  <p class="name">${data.name}</p>
                  <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
      "vi-VN"
    )}</span></p>
      </div>
    `;
  });
  $(".sale-content").innerHTML = $(".sale-content").innerHTML + htmls2.join("");
  //Render favourite
  const htmls3 = data3.map((data) => {
    return `
    <div class="item-products" data-id=${data.id} onclick="handleClick(this)" >
                  <img src=${data.main[0].images} alt="" class="item-img">
                  <p class="name">${data.name}</p>
                  <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
      "vi-VN"
    )}</span></p>
      </div>
    `;
  });
  $(".favourite-content").innerHTML =
    $(".favourite-content").innerHTML + htmls3.join("");
})();

//Slider-Scroll
$$(".next").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.dataset.status == "bestseller") {
      $(".bestseller-content").scrollLeft +=
        $(".item-products").offsetWidth * 3;
    } else if (e.target.dataset.status == "sale") {
      $(".sale-content").scrollLeft += $(".item-products").offsetWidth * 3;
    } else if (e.target.dataset.status == "favourite") {
      $(".favourite-content").scrollLeft += $(".item-products").offsetWidth * 3;
    }
  });
});
$$(".prev").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.dataset.status == "bestseller") {
      $(".bestseller-content").scrollLeft -=
        $(".item-products").offsetWidth * 3;
    } else if (e.target.dataset.status == "sale") {
      $(".sale-content").scrollLeft -= $(".item-products").offsetWidth * 3;
    } else if (e.target.dataset.status == "favourite") {
      $(".favourite-content").scrollLeft -= $(".item-products").offsetWidth * 3;
    }
  });
});