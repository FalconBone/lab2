async function start() {
  await fetch('/data')
    .then(response => response.json())
    .then(async data => {

      if (data.formData['with_animals']) {
        if (data.formData['human_amount'] > 5) {
          pic = 'peopleanimal.jpg'
        } else {
          pic = 'nopeopleanimal.jpeg'
        }
      } else {
        if (data.formData['human_amount'] > 5) {
          pic = 'peoplenoanimal.jpg'
        } else {
          pic = 'nopeoplenoanimal.jpeg'
        }
      }

      document.getElementById('picture').style.backgroundImage = `url(${pic})`

      for (let key in data.formData) {
        if (key != 'firstTime' && key != 'with_animals') {
          if (key === 'pay_type') {
            if (data.formData[key] == 1) {
              document.getElementById(key).textContent = "Карта"; 
            } else if (data.formData[key] == 2) {
              document.getElementById(key).textContent = "Наличные"; 
            } else {
              document.getElementById(key).textContent = "Онлайн"; 
            }
          } else {
            document.getElementById(key).textContent = data.formData[key]; 
          }
        }
      }

      if (data.formData['with_animals']) {
        document.getElementById('with_animals').textContent = 'да'
      } else {
        document.getElementById('with_animals').textContent = 'нет'
      }

    })
    .catch(error => {
      console.log('Ошибка при подключении к базе данных:', error);
    });
}

start()