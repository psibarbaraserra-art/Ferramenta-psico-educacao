(function(){
  var c = window.PSIQUE_CONFIG || {};
  var nomes = {responsavel:'nome da responsável', crp:'CRP', contato:'e-mail de contato', foro:'cidade/UF'};
  document.querySelectorAll('[data-cfg]').forEach(function(e){
    var k = e.getAttribute('data-cfg');
    if (c[k]) { e.textContent = c[k]; }
    else { e.textContent = '[' + (nomes[k] || k) + ']'; e.className = 'fill'; }
  });
})();
