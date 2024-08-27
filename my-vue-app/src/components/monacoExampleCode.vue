
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue';
import * as monaco from 'monaco-editor';

// Variáveis
const monacoContainer = ref<HTMLDivElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor | null = null;
const emit = defineEmits(['getValue', 'getChange']);

// Funções
const handleChange = () => {
  if (editor) {
    try {
      const value = editor.getValue();
      emit('getChange', value);
    } catch (error) {
      console.error('Error getting editor value:', error);
    }
  } else {
    console.error('Editor is not initialized');
  }
};


const props = defineProps({
  code: String,
});

const editorValue = ref(props.code || `programa {
  funcao inicio() {

  }
}`);

// Atualizar o editor quando a prop `code` mudar
watch(() => props.code, (newCode) => {
  
  
  editor?.setValue(newCode)
});

const createEditor = () => {
  if (monacoContainer.value) {
    editor = monaco.editor.create(monacoContainer.value, {
      value: editorValue.value,
      language: 'portugol',
      theme: 'vs-dark',
    });

    // Register the language and other configurations here
    monaco.languages.register({
      id: 'portugol',
      extensions: ['.por'],
      aliases: ['Portugol'],
    });

    monaco.languages.setLanguageConfiguration('portugol', {
      wordPattern: /(-?\d*\.\d\w*)|([^\s!"#%&'()*+,./:;<=>?@[\\\]^`{|}~\-]+)/g,
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/'],
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      onEnterRules: [
        {
          beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
          afterText: /^\s*\*\/$/,
          action: {
            indentAction: monaco.languages.IndentAction.IndentOutdent,
            appendText: ' * ',
          },
        },
        {
          beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
          action: {
            indentAction: monaco.languages.IndentAction.None,
            appendText: ' * ',
          },
        },
        {
          beforeText: /^(\t|( {2}))* \*( ([^*]|\*(?!\/))*)?$/,
          action: {
            indentAction: monaco.languages.IndentAction.None,
            appendText: '* ',
          },
        },
        {
          beforeText: /^(\t|( {2}))* \*\/\s*$/,
          action: {
            indentAction: monaco.languages.IndentAction.None,
            removeText: 1,
          },
        },
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
        { open: '`', close: '`', notIn: ['string', 'comment'] },
        { open: '/**', close: ' */', notIn: ['string'] },
      ],
      folding: {
        markers: {
          start: /^\s*\/\/\s*#?region\b/,
          end: /^\s*\/\/\s*#?endregion\b/,
        },
      },
    });

    monaco.languages.setMonarchTokensProvider('portugol', {
      defaultToken: 'invalid',
      tokenPostfix: '.portugol',
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
        { open: '`', close: '`', notIn: ['string', 'comment'] },
        { open: '/**', close: ' */', notIn: ['string'] },
      ],
      keywords: [
        'faca',
        'enquanto',
        'para',
        'se',
        'senao',
        'const',
        'funcao',
        'programa',
        'escolha',
        'caso',
        'contrario',
        'pare',
        'retorne',
        'inclua',
        'biblioteca',
        'verdadeiro',
        'falso',
      ],
      typeKeywords: ['real', 'inteiro', 'vazio', 'logico', 'cadeia', 'caracter'],
      operators: [
        'nao',
        'e',
        'ou',
        '-',
        '+',
        '*',
        '/',
        '%',
        '=',
        '==',
        '!=',
        '>',
        '<',
        '<=',
        '>=',
        '++',
        '--',
        '<<',
        '>>',
        '^',
        '|',
        '~',
        '-->',
        '&',
        '+=',
        '-=',
        '*=',
        '/=',
      ],
      symbols: /[!%&*+/:<=>?^|~\-]+/,
      escapes: /\\(?:["'\\abfnrtv]|x[\dA-Fa-f]{1,4}|u[\dA-Fa-f]{4}|U[\dA-Fa-f]{8})/,
      digits: /\d+(_+\d+)*/,
      octaldigits: /[0-7]+(_+[0-7]+)*/,
      binarydigits: /[01]+(_+[01]+)*/,
      hexdigits: /[\dA-Fa-f]+(_+[\dA-Fa-f]+)*/,

      tokenizer: {
        root: [
          [/[{}]/, 'delimiter.bracket'],
          [/([1A-Z_a-z{}]\w+)(?=\s*\()/, 'functions'],
          { include: 'common' },
        ],
        common: [
          [
            /[$_a-z][\w$]*/,
            {
              cases: {
                '@typeKeywords': 'keyword',
                '@keywords': 'keyword',
                '@default': 'identifier',
              },
            },
          ],
          [/[A-Z][\w$]*/, 'type.identifier'],
          { include: '@whitespace' },
          [/[()[\]{}]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [
            /@symbols/,
            { cases: { '@operators': 'operator', '@default': '' } },
          ],
          [/\d*\.\d+([Ee][+\-]?\d+)?/, 'number.float'],
          [/0[Xx][\dA-Fa-f]+/, 'number.hex'],
          [/\d+/, 'number'],
          [/[,.;]/, 'delimiter'],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
          [/'[^'\\]'/, 'string'],
          [/'/, 'string.invalid'],
        ],
        comment: [
          [/[^*/]+/, 'comment'],
          [/\/\*/, 'comment', '@push'],
          ['\\*/', 'comment', '@pop'],
          [/[*/]/, 'comment'],
        ],
        string: [
          [/[^"\\]+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        ],
        whitespace: [
          [/[\t\n\r ]+/, 'white'],
          [/\/\*/, 'comment', '@comment'],
          [/\/\/.*$/, 'comment'],
        ],
        bracketCounting: [
          [/{/, 'delimiter.bracket', '@bracketCounting'],
          [/}/, 'delimiter.bracket', '@pop'],
          { include: 'common' },
        ],
      },
    });

    monaco.editor.defineTheme('portugol', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'functions', foreground: 'F5D7A9' },
        { token: 'string.escape', foreground: 'D2BB85' },
        { token: 'string.escape.invalid', foreground: 'DF5953' },
      ],
      colors: {},
    });
  }
};

onMounted(() => {
  createEditor();

  window.addEventListener('resize', () => {
    if (editor) {
      editor.layout();
    }
  });
});

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose();
  }
  window.removeEventListener('resize', () => {
    if (editor) {
      editor.layout();
    }
  });
});
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  height: 100%;
  border: none; /* Remove any border */
}

.monaco-editor .margin,
.monaco-editor .glyph-margin,
.monaco-editor .lines-content,
.monaco-editor .scroll-decoration,
.monaco-editor .overflow-guard,
.monaco-editor .view-lines,
.monaco-editor .monaco-editor-background,
.monaco-editor .inputarea.ime-input {
  outline: none !important; /* Remove any outline which might cause blue borders */
  border: none !important; /* Ensure no border is applied */
}
#button {
  background-color: #1e1e1e;
}
</style>
<template>
  <div  class="flex flex-col items-center ">
    <div @change="handleChange" ref="monacoContainer" class="monaco-editor-container  h-full"></div>
    
  </div>
</template>