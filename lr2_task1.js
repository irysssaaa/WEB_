function calculate() {
  let result = 'outer value';                
  console.log('Зовні до if:', result);       

  if (true) {
    let result = 'inner value';              
    console.log('Всередині if:', result);    
  }

  console.log('Після if (зовні):', result);  
}

// запуск по кліку
document.getElementById('run').addEventListener('click', calculate);
