/*  1:Criar nova tabela 'pagamentos' excluindo os valores antigos e adicionando
      os valores colocados pelo formulario

    2:Adicionar os valores do formulario aos valores ja registrado anteriormente
    `OBS` nesse caso a tabela não vai ser criada novamente, basta não usar a opção
          'Pagamento.sync({forced:true})'  
*/      
const database = require('./database');

const Pagamento = database.sequelize.define('pagamentos',{
    nome: {
        type: database.Sequelize.STRING
    },
    valor:{
        type:database.Sequelize.DOUBLE
    }
})

//Pagamento.sync({force:true})

module.exports = Pagamento;