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
});
