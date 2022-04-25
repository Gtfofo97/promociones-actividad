<template>
  <div>
    <tiptap-vuetify v-on="inputListeners" :extensions="extensions" :placeholder="placeholder" />
  </div>
</template>

<script>
/* eslint-disable prefer-object-spread */

import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Image,
} from 'tiptap-vuetify';

export default {
  name: 'AppRichTextbox',
  components: { TiptapVuetify },
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Blockquote,
      Link,
      Underline,
      Image,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3, 4],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    content: '',
  }),
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: (event) => {
          vm.$emit('input', event);
        },
      });
    },
  },
};
</script>
