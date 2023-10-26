async function start() {
  await fetch('/data')
        .then(response => response.json())
        .then(data => {

          if (!data.formData['firstTime']) {

          
          //Если данные были заполнены, но не до конца, они вернутся
          for (let key in data.formData) {
            if (key != 'firstTime' && key != 'with_children') {
              document.getElementById(key).value = data.formData[key]; 
              if (document.getElementById(key).value === '' && key != 'comment')  {
                document.getElementById(key).style.border = '1px solid red'
                document.getElementById(key).style.boxShadow = '0px 0px 10px 2px rgba(110, 42, 45, 0.2)';
              }
            }
          }

          document.getElementsByName('with_children').forEach(element => {
            if (element.value ===  data.formData['with_children']) {
              element.checked = true
            } else {
              element.checked = false
            }
          });

          if (data.formData['with_animals'] === 'on') {
            document.getElementById('with_animals').checked = true
          } else {
            document.getElementById('with_animals').checked = false
          }
        }
          
        })
        .catch(error => {
          console.log('Ошибка при подключении к базе данных:', error);
        });
}

start()