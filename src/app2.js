const express = require('express');
const app = express()
const handlebars = require('express-handlebars')
const moment = require('moment')
const Pagamento = require('./models/Pagamento')
const path = require('path');

//Indicar o uso do 'handlebers'
app.engine('handlebars', handlebars({
    defaultLayout:'main',
    helpers:{
        formatDate:(date) => {
            return moment(date).format('DD/MM/YYYY') 
            // Formatar saida do campo do campo do banco Cadastro:createdAt usando a extensão moment
        }
    } 
    /*runtimeOptions:{
    allowProtoPropertiesByDefault:true,
    allowProroMethodsByDefault:true
    },*/ // Metodo para buscar os valores do banco para o arquivo pagamento.handlebars
        //  Nesse caso usei uma outra opção: EX: dataValues.nome(pagamento.handlebars) 
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Rotas
app.get('/pagamento', function (req,res) {
    //Enviar registros do banco para a pagina pagamento.html
    Pagamento.findAll({order:[['id','ASC']]}) //Ordenar por 'id' em ordem descresente (DESC) ou (ASC)
        .then( pag => {
            res.render('pagamento', {pag:pag});
        })
        
})
app.get('/cad-pagamento', function (req,res) {
    res.render('cad-pagamento')
})

//Adicionar valores do formulario do arquivo 'cad-pagamento' no banco de dados.
app.post('/add-pagamento', function (req,res){
    Pagamento.create({
        nome:req.body.nome,
        valor: req.body.valor
    })
    .then( ()=>{
        //res.send('Pagamento cadastrado com sucesso')
        res.redirect('/pagamento')
    }).catch( err => {
        res.send('Erro: Pagamento não cadastrado ' + err)
    })
  //res.send('Nome: ' + req.body.nome + '<br>Valor: ' + req.body.valor) 
})

//Apagar registros do banco atraves do front de cordo com 'id'
app.get('/del-pagamento/:id', function (req,res) {
    Pagamento.destroy({
        where:{'id':req.params.id}
    })
    .then( ()=> {
        res.redirect('/pagamento')
        //res.send('Pagamento apagado com sucesso')
    }).catch( err => {
        res.send('Pagamento não foi apagado')
    })
})

//Porta
app.listen(8080, () => {
    console.log('Rodando na porta 8080')
})