import './style.css'

export function Product() {
  return (
    <section className='product'>
      <h1>
        Layout
      </h1>

      <p>
        Todo o design foi feito no Figma e pode ser acesso nesse
        <a href="https://www.figma.com/file/3G2ScwFQtiC086S2idqv8M/Desafio-Albert-Einstein?type=design&node-id=0%3A1&mode=design&t=fyisec8cAxmS611F-1">Link</a>.
        O arquivo também conta com as referencias de design e um board com um fluxo de funcionalidades, mapeadas para definir
        as possibilidades de funcionalidades que o chatbot poderia ter.
      </p>

      <p>
        Criei uma tela de boas vindas para deixar o projeto mais elegante e capturar o nome do usuário que posteriormente será utilizado no chatbot.
      </p>

      <img src="/img-product-1.png" alt="img-product-1" />

      <img src="/img-product-2.png" alt="img-product-2" />

      <p>
        A concepção do design se inicia com uma pesquisa para encontrar referencias em implementações do mercado.
      </p>

      <img src="/img-product-3.png" alt="img-product-3" />

      <p>
        Nessa imagem temos 3 referencias. Pude notar na pesquisa que o produto Zendesk parece ser um dos mais
        utilizados do mercado por marcas grandes.
      </p>

      <p>
        Decidi seguir com algo semelhante no desktop, o componente do chatbot, que se assemelha a uma modal,
        localizado no canto inferior esquerdo, com um overlay para melhorar o contraste e proporcionar um foco maior
        pro chatbot quando ele está aberto. O titulo do componente aberto e um botão de fechar no cabeçalho e um
        input com um botão de enviar no rodapé e a sessão de conversação no centro.
      </p>

      <p>
        No mobile, optei por usar toda a tela, deixando o componente em fullscreen. Como temos um tamanho de tela bem menor,
        essa é uma boa maneira de melhorar a interação do usuário e proporcionar uma experiencia melhor dado o tamanho da tela.
      </p>

      <h1>
        Pagina de fundo
      </h1>

      <p>
        Uma das primeiras ideias que eu tive, quando comecei a desenhar a solução, foi uma forma de exibir as perguntas mockadas pra
        ficar fácil de testar. Em seguida, pensando em como eu ia documentar, poderia ser em um arquivo markdown ou em um arquivo
        do google docs mas eu pensei em usar a pagina da aplicação que iria ficar fácil e fazer a documentação integrada.
      </p>

      <p>
        Esse design e estrutura nem tem referencia, eu fui fazendo de freestyle mesmo porque nas ultimas semanas eu estou em um processo criativo bem maior por conta da criação da nova versão do meu site. Então eu estou constantemente olhando varias referencias e saiu um design bonito e funcional com facilidade.
      </p>

      <p>
        Uma das abas contem as perguntas e alguns botões de ação que melhoram a usabilidade, assim em vez de selecionar a pergunta com o mouse o usuário pode simplesmente clicar na ação de copiar para a área de transferência por exemplo. Ou clicar no botão de terminal e já inserir o texto no input do chatbot.
      </p>

      <p>
        A aba de produto contem as explicações do layout e features para o produto.
      </p>

      <p>
        E a de documentação contem explicações mais técnicas.
      </p>

      <h1>
        Features
      </h1>

      <ul>
        <li>
          Albertinho, a cara do chatbot ou do assistente pessoal. Uma das ideias que tive foi de dar uma identidade visual para o chatbot, gerando uma aproximação maior com o usuário, tornando ele mais convidativo a ser usado. Um bom exemplo que identifiquei na pesquisa foi a Kovi que tem o Kovinho, dai surge a ideia do Albertinho, uma figura carismática que torna a interação mais interessante.
        </li>

        <li>
          Perguntas comuns como sugestão identificas pelo padrão de uso dos usuários.

          <ul>
            <li>Qual foi a minha ultima nota do trabalho da matéria X.</li>
            <li>Entre outras que podem surgir analisando o contexto.</li>
          </ul>
        </li>

        <li>
          Perguntas que interaja com os dados do curso não só sobre o curso.

          <ul>
            <li>Quando é a próxima prova da matéria X.</li>
          </ul>
        </li>

        <li>
          Poderia ser um assistente virtual integrado a uma IA em vez de um chatbot comum, isso permitia uma área dedicada com mais funcionalidades e uma utilidade muito maior para os alunos. Se for uma IA ela poderia ser feita pra ser usada não só pelos alunos mas em todo setor que quisesse dentro do hospital.
        </li>

        <li>
          Usar UI para cruzar a pergunta do usuário com a melhor resposta, usando como base uma lista de perguntas pre definidas sobre o curso. Ou até mesmo treinar uma UI para analisar o matéria do curso em busca da resposta para a pergunta do usuário, sem a necessidade de predefinir perguntas e respostas.
        </li>

        <li>
          Comandos por áudio, da pra fazer a transcrição do áudio e usar como o texto da pergunta.
        </li>
      </ul>
    </section>
  )
}
