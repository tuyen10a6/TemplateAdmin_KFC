var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
  $http.get("https://localhost:7026/api/Product/GetAllProduct").then(
    function (response) {
      // Xử lý dữ liệu trả về tại đây nếu cần
      $scope.product = response.data;
      console.log($scope.product);
    },
    function (error) {
      // Xử lý lỗi tại đây nếu cần
      console.log(error);
    }
  );
  // Delete Product
  $scope.deleteProduct = function (id) {
    var confirmDelete = confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (confirmDelete) {
      $http
        .delete("https://localhost:7026/api/Product/DeleteProduct/" + id)
        .then(
          function (response) {
            $http.get("https://localhost:7026/api/Product/GetAllProduct").then(
              function (response) {
                $scope.product = response.data;
                alert("Xóa sản phẩm thành công");
              },
              function (error) {
                console.log(error);
              }
            );
          },
          function (error) {
            console.log(error);
          }
        );
    }
  };
  $scope.textinputsearch = "";
  $scope.SearchProduct = function () {
    if ($scope.textinputsearch == "") {
      $http.get("https://localhost:7026/api/Product/GetAllProduct").then(
        function (response) {
          // Xử lý dữ liệu trả về tại đây nếu cần
          $scope.product = response.data;
          console.log($scope.product);
        },
        function (error) {
          // Xử lý lỗi tại đây nếu cần
          console.log(error);
        }
      );
    }
    $http
      .get(
        "https://localhost:7026/api/Product/SearchProduct/" +
          $scope.textinputsearch
      )
      .then(
        function (response) {
          $scope.product = response.data;
          console.log(response.data);
        },
        function (error) {
          console.log(error);
        }
      );
  };
  // Get All Nhà Cung Cấp
  $http.get("https://localhost:7026/api/NhaCungCap/GetNhaCungCap").then(
    function (response) {
      // Xử lý dữ liệu trả về tại đây nếu cần
      $scope.nhacungcap = response.data;
      console.log($scope.nhacungcap);
    },
    function (error) {
      // Xử lý lỗi tại đây nếu cần
      console.log(error);
    }
  );
  // Get All Danh Mục
  $http.get("https://localhost:7026/api/DanhMuc/GetAllDanhMuc").then(
    function (response) {
      $scope.category = response.data;
      console.log($scope.category);
    },
    function (error) {
      console.log(error);
    }
  );
  $scope.addProduct = function () {
    const data = {
      maSanPham: 0,
      tenSanPham: $scope.productName_Create,
      giaTien: $scope.productPrice_Create,
      image: "",
      ngayTao: "2023-04-24T02:55:09.805Z",
      tenDanhMuc: "string",
      tenNhaCungCap: "string",
      maDanhMuc: $scope.CategoryID_Create,
      luotXem: 0,
      moTa: $scope.productName_MoTa,
      maNhaCungCap: 1,
      totalQuantitySold: 0,
    };

    const fileInput = document.querySelector("#UploadFile");
    const file = fileInput.files[0];

    if (!file) {
      alert("Vui lòng chọn hình ảnh sản phẩm.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Gọi API để upload ảnh và lấy đường dẫn trả về
    $http({
      method: "POST",
      url: "https://localhost:7026/api/UpLoadFile/upload/product",
      headers: {
        "Content-Type": undefined,
      },
      transformRequest: angular.identity,
      data: formData,
    })
      .then(function (response) {
        // Thêm đường dẫn ảnh vào thông tin sản phẩm
        data.image = "https://localhost:7026" + response.data.filePath;

        // Gọi API để thêm sản phẩm mới
        $http({
          method: "POST",
          url: "https://localhost:7026/api/Product/CreateProduct",
          data: data,
        })
          .then(function (response) {
            alert("Thêm sản phẩm thành công");
            console.log("Thêm sản phẩm thành công!");
            $http.get("https://localhost:7026/api/Product/GetAllProduct").then(
              function (response) {
                // Xử lý dữ liệu trả về tại đây nếu cần
                $scope.product = response.data;
                console.log($scope.product);
              },
              function (error) {
                // Xử lý lỗi tại đây nếu cần
                console.log(error);
              }
            );
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  $scope.getProductByID = function (id) {
    $http.get("https://localhost:7026/api/Product/GetProductByID/" + id).then(
      function (response) {
        $scope.ProductByID = response.data;
        console.log(response.data);
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.updateProduct = function () {
    const productid_val = document.getElementById("ProductID_Update").value;
    const productname_val = document.getElementById("ProductName_Update").value;
    const productprice_val = document.getElementById(
      "ProductPrice_Update"
    ).value;
    const productmota_val = document.getElementById("ProductMota_Update").value;

    var data = {
      maSanPham: productid_val,
      tenSanPham: productname_val,
      giaTien: productprice_val,
      image: "",
      ngayTao: "2023-04-24T04:06:56.742Z",
      tenDanhMuc: "string",
      tenNhaCungCap: "string",
      maDanhMuc: $scope.CategoryID_Update,
      luotXem: 0,
      moTa: productmota_val,
      maNhaCungCap: 1,
      totalQuantitySold: 0,
    };

    const fileInput = document.querySelector("#UploadFiles");
    const file = fileInput.files[0];

    if (!file) {
      alert("Vui lòng chọn hình ảnh sản phẩm.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Gọi API để upload ảnh và lấy đường dẫn trả về
    $http({
      method: "POST",
      url: "https://localhost:7026/api/UpLoadFile/upload/product",
      headers: {
        "Content-Type": undefined,
      },
      transformRequest: angular.identity,
      data: formData,
    }).then(function (response) {
      // Thêm đường dẫn ảnh vào thông tin sản phẩm
      data.image = "https://localhost:7026" + response.data.filePath;

      $http.post("https://localhost:7026/api/Product/UpdateProduct", data).then(
        function (response) {
          // handle success
          alert("Sửa sản phẩm thành công");
          console.log(response);

          $http
            .get("https://localhost:7026/api/Product/GetAllProduct")
            .then(function (response) {
              $scope.product = response.data;
              console.log(response.data);
            });
          // do something after update successfully
        },
        function (response) {
          // handle error
          console.log(response);
          alert("Lỗi");
          // do something when update failed
        }
      );
    });
  };
});
