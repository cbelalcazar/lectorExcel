 angular.module('MyApp', ['angular-js-xlsx'])
    .controller('myController', function($scope) {
      // Estas son las funciones que ejecuta la directiva
      $scope.read = function (workbook) {
        var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
        $scope.data = angular.copy(XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]));
        $scope.data.forEach(function(obj, key){
          if (true) {
            llaves = Object.keys(obj); 
            suma = 0;
            llaves.forEach(function(ob, ke){
              obj[ob] = obj[ob].trim();
              if (ob == "Ene" || ob == "Feb"|| ob == "Mar"|| ob == "Abr"|| ob == "May"|| ob == "Jun"|| ob == "Jul"|| ob == "Ago"|| ob == "Sep"|| ob == "Oct"|| ob == "Nov"|| ob == "Dic") {
                var numero = obj[ob].replace(",", '').replace(",", '').replace(",", '').replace(",", '').replace(",", '');
                var numero = numero.replace("-", '0');
                obj[ob] = Number(numero);
                suma += obj[ob];
              }
            }); 
            obj.sumatoriaValores = suma;
          }
        });

        $scope.data = _.filter($scope.data, function(obj){ 
          return obj.sumatoriaValores > 0; 
        });
        $scope.data = _.filter($scope.data, function(obj, key){ 
          return obj.Concepto != undefined;
        });
        var datosFinal = [];
        var sumatoriaTodosDatos = 0;
        $scope.data.forEach(function(obj, key){
          if (obj.Concepto.substring(0,5) != 'TOTAL') {
            sumatoriaTodosDatos += obj.sumatoriaValores;
            datosFinal.push(obj);
          }
        });

        console.log(datosFinal);
        console.log(sumatoriaTodosDatos);
        $scope.data = datosFinal;

      }

      $scope.error = function (e) {
        /* DO SOMETHING WHEN ERROR IS THROWN */
        console.log(e);
      }
    });