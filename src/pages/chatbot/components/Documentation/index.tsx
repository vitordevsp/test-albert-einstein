import './style.css'

export function Documentation() {
  return (
    <section className='documentation'>
      <h1>
        Framework
      </h1>

      <p>
        O framework escolhido para implementar o desafio foi o ReactJS. Escolhi criar uma SPA com o
        Vite por ser um projeto pequeno e simples que não se beneficiaria de uma estrutura maior e
        mais complexa como o NextJS nesse primeiro momento.
      </p>

      <p>
        A escolha do ReactJS se da pela ampla estrutura que a comunidade fornece que é o maior
        ecossistema de todos os frameworks web, sem contar o fato de ser o mais difundido no mercado.
        Trabalhando com VueJS, que tem seus pontos positivos em cima do ReactJS, a diferença entre
        as comunidades e a quantidade de recursos disponível para ambos ficou ainda mais evidente pra mim.
      </p>

      <p>
        O ReactJS se concentra em desenvolver a biblioteca que é o cor do React e não em criar uma
        estrutura que estenda funcionalidades, essa responsabilidade acaba ficando mais com a comunidade
        e com times internos da própria meta que criam libs opensouce que nasceram para resolver problemas internos.
      </p>

      <p>
        Se você precisar resolver um problema, as chances de ter uma ferramenta pro ReactJS é maior.
      </p>

      <h1>
        Style
      </h1>

      <p>
        Pela aplicação ser bem pequena e com componentes com layout especifico, acabei não usando nenhuma biblioteca
        de CSS e nem de UI, desenvolvi o estilo usando só CSS, até como uma maneira de praticar também,
        no final das contas, se você sabe CSS é só entender o padrão de qualquer lib.
      </p>

      <h1>
        Estrutura do projeto
      </h1>

      <p>
        Ter escolhido fazer a documentação integrada ao projeto, faz com que o projeto ficasse maior e eu pudesse criar
        uma estrutura mais profissional e escalável. Segue uma breve explicação da estrutura.
      </p>

      <ul>
        <li>
          <b>src/pages:</b> Pasta que contem as duas paginas da aplicação, home e a pagina do chatbot.
        </li>

        <li>
          <b>src/components:</b> A componentização da interface é uma das praticas mais importantes para construir aplicações web modernas.
          Facilitamos a implementação da interface, leitura e manutenção do código, entre outros ganhos.
          Mesmo escrevendo o estilo com CSS, por ser componentes, fica muito fácil de mudar a abordagem no futuro,
          porque o projeto está bem estruturado.
        </li>

        <li>
          <b>src/routes:</b> Implementação do react-router e configuração das rotas da aplicação.
        </li>

        <li>
          <b>src/services:</b> Implementa o serviço de questions com os métodos de listar e buscar uma unica pergunta, batendo em uma API rodando em um ambiente serveless.
        </li>

        <li>
          <b>src/context:</b> Como eu precisava fazer ações com os dados em mais de um local, como por exemplo, capturar o nome do usuário
          em uma pagina e usar em outra ou abrir o chatbot com um clique na lista de perguntas, foi necessário criar um context
          para fornecer os dados globalmente para a aplicação.
        </li>

        <li>
          <b>src/lib:</b> Contem a configuração de uma instancia do axios que aponta pra API.
          Nessa pasta eu gosto de armazenar configurações e instancias dos recursos que a aplicação utiliza.
        </li>

        <li>
          <b>src/styles:</b> A pasta que contem um arquivo de configurações globais e classes utilitárias que escrevi para ficar
          mais fácil de compor a UI e um style que customiza a scrollbar do navegador pra deixar o site mais elegante.
        </li>
      </ul>

      <h1>
        Dados mockados
      </h1>

      <p>
        Em vez de simplesmente deixar os dados mockados no Front-end, aproveitei para testar uma feature da Vercel que são as Edge Functions.
        Elas são equivalentes a Serveless Functions que podemos hospedar no GCP por exemplo,
        ela basicamente funciona como um GET na rota /api/questions retornando um array com as perguntas.
      </p>

      <a
        href="https://github.com/vitordevsp/examples-edge-functions/blob/main/pages/api/questions.js"
        className='text-bold'
      >
        Link da Function
      </a>
    </section>
  )
}
