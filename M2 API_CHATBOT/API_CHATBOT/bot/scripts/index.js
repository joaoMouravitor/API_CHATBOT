// importando as variáveis de ambiente
const env = require("../.env");

// importando as bibliotecas 'Telegraf' e 'Markup'
const { Telegraf, Markup } = require("telegraf");

// importando a biblioteca 'Telegraf-Session'
const LocalSession = require("telegraf-session-local");

const axios = require('axios');

const bot = new Telegraf(env.token);

bot.use(new LocalSession({ database: "example_db.json" }).middleware());

//criando um array para salvar os emprestimos

let emprestimos = []

let list = []

//função para buscar os pratos da API
async function emprestimoAPI() {
  let res = await axios.get("http://localhost:3000/api/emprestimo/")
  emprestimos = res.data
  return emprestimos;
}

// criando o nosso teclado
const teclado_emprestimo = Markup.keyboard(
  emprestimos.forEach((emprestimo) => { return emprestimo.name }),
  { columns: 3 }
).resize();
const teclado_livros = Markup.keyboard(
  ["Harry Potter", "O Cristão e a Política", "Tranformando Suor e Ouro"]
).resize();


// criando um Inline Keyboard dinâmico

const itemsButtons = (list) =>
  Markup.inlineKeyboard(
    list.map((item) => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
  );


const CardButtons = Markup.inlineKeyboard(
  [
    Markup.button.callback("Livros", "card_livros"),
    Markup.button.callback("Emprestimos", "card_emprestimos"),
    Markup.button.callback("Cancelar", "cancelar"),
  ],
  { columns: 3 }
);

//Inicial do Bot

bot.start(async (ctx) => {
  emprestimoAPI();
  const from = ctx.update.message.from;
  await ctx.reply(`Seja bem vindo a Biblioteca ${from.first_name}`);
  await ctx.reply("Escolha o livro que desejar", CardButtons);
  
  ctx.session.list = []
});

bot.action(/card_emprestimo/, (ctx) => {
  ctx.reply(`Novo emprestimo`, teclado_emprestimo);
});
bot.action(/card_livros/, (ctx) => {
  ctx.reply(`livros`)
  pratos.forEach((livro) => {
    ctx.replyWithPhoto({url: `${livro.image}`}, {caption: `${livro.name}, Preço: ${livro.price}`})
  }
)});

bot.action(/finalizar/, (ctx) => {
  ctx.reply(
    "Deseja finalizar o emprestimo?",
    Markup.inlineKeyboard(
      [
        Markup.button.callback("Sim", "concluir_emprestimo"),
        Markup.button.callback("Não", "novo_emprestimo"),
      ],
      { columns: 3 }
    )
  );
  ctx.reply(`Seu pedido: ${ctx.session.list}`, itemsButtons(ctx.session.list));
});
bot.action(/concluir_emprestimo/, (ctx) => {
  ctx.reply("Emprestimo realizado");
});
bot.action(/novo_emprestimo/, (ctx) => {
  ctx.reply("Novo emprestimo", CardButtons);
});
bot.action(/cancelar/, (ctx) => {
  ctx.reply("Cancelar emprestimo!");
});

bot.startPolling();
