// ################### index code ###############

let levelBtn = document.querySelector('#btn-level')
      let level = document.querySelector('#level')

      levelBtn.addEventListener('click', () => {
        if(level.value === ''){
          alert('Selecione um nivel!')
        }
        window.location.href = 'game_page.html?' + level.value
      })
// ################### index code ###############