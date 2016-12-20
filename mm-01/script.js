(function(){
	var App = (function(){
		var
			n, system, roots,
			i, j, k;
		return{
			/**
			 * Инициализация приложения
			 */
			init: function () {
				n = App.getInt(prompt('Введите число уравнений системы:'));
				system = new Array(n);
				roots = new Array(n);

				for(i = 0; i < n; i++)
					system[i] = new Array(n);

				for(i = 0; i < n; i++)
					for(j = 0; j <= n; j++)
						system[i][j] = App.getFloat(prompt('Введите систему[' + i + ';' + j + '] = '));

				App.printSystem();

				App.iteration(n);

				App.searchRoots();

				document.getElementById('wrapper').className = '';
			},
			/**
			 * Обработка количества уравнений
			 * @param string
			 * @returns int
			 */
			getInt: function(string){
				var int = parseInt(string);
				if(!isNaN(int))
					return int;
				else{
					alert('Не верно указано число уравнений.');
					App.init();
				}
			},
			/**
			 * Обработка чисел
			 * @param string
			 * @returns float
			 */
			getFloat: function (string) {
				var float = parseFloat(string);
				if(!isNaN(float))
					return float;
				else
					return 0;
			},
			/**
			 * Итерация
			 * @param iter_item
			 */
			iteration: function(iter_item) {
				var html = '';

				for(iter_item = 0; iter_item < (n - 1); iter_item++) {
					if (system[iter_item][iter_item] == 0)
						App.swapRows(iter_item);

					for(j = n; j >= iter_item; j--)
						system[iter_item][j] /= system[iter_item][iter_item];


					for(i = iter_item + 1; i < n; i++)
						for(j = n; j >= iter_item; j--)
							system[i][j] -= system[iter_item][j] * system[i][iter_item];

					/**
					 * Рисуем таблицу итераций
					 */

					for(i = 0; i < n; i++) {
						html += '<tr>';
						for(j = 0; j <= n; j++)
							html += '<td>' + App.getFloat(system[i][j].toFixed(4)) + '</td>';
						html += '</tr>';
					}

					if(!(iter_item % 2))
						html += '<tr><td class="empty"></td></tr>';

					document.getElementById('iterations_head').setAttribute('colspan', n + 1);
					document.getElementById('iterations_body').innerHTML = html;
				}
			},
			/**
			 * Смена строк
			 * @param iter_item
			 */
			swapRows: function(iter_item) {
				for(i = iter_item + 1;i < n; i++) {
					if(system[i][iter_item] !== 0) {
						for(j = 0; j <= n; j++) {
							k = system[i - 1][j];
							system[i - 1][j] = system[i][j];
							system[i][j] = k;
						}
					}
				}
			},
			/**
			 * Поиск корней
			 */
			searchRoots: function () {
				roots[n - 1] = system[n - 1][n] / system[n - 1][n - 1];
				for(i = n - 2;i >= 0; i--) {
					k=0;
					for(j = n - 1; j > i; j--)
						k = (system[i][j] * roots[j]) + k;
					roots[i] = system[i][n] - k;
				}
				/**
				 * Рисуем ответ
				 */
				for(i = 0; i < n; i++)
					document.getElementById('answer').innerHTML += "<li>x" + i + " = " + roots[i] + "</li>";
			},
			printSystem: function () {
				var html = '';
				for(var row = 0; row < n; row++){
					html += '<tr>';

					for(var column = 0; column < n + 1; column++)
						html += '<td>' + App.getFloat(system[row][column].toFixed(4)) + '</td>';

					html += '</tr>';
				}
				console.log(html);
				document.getElementById('system_head').setAttribute('colspan', n + 1);
				document.getElementById('system_body').innerHTML = html;
			}
		}
	})();
	App.init();
})();

