<script setup>
defineProps({
  editor: Object,
});
</script>
<template>
  <img
    src="/src/assets/icons/bold.svg"
    alt="bold icon"
    class="w-4 h-4 cursor-pointer hover:opacity-70"
    @click="editor.chain().focus().toggleBold().run()"
  />
  <img
    src="/src/assets/icons/italic.svg"
    alt="italic icon"
    class="w-4 h-4 cursor-pointer hover:opacity-70"
    @click="editor.chain().focus().toggleItalic().run()"
  />
  <img
    src="/src/assets/icons/leftText.svg"
    alt="left icon"
    class="w-4 h-4 cursor-pointer hover:opacity-70"
    @click="editor.chain().focus().setTextAlign('left').run()"
  />
  <img
    src="/src/assets/icons/centerText.svg"
    alt="center icon"
    class="w-4 h-4 cursor-pointer hover:opacity-70"
    @click="editor.chain().focus().setTextAlign('center').run()"
  />

  <img
    src="/src/assets/icons/rightText.svg"
    alt="right icon"
    class="w-4 h-4 cursor-pointer hover:opacity-70"
    @click="editor.chain().focus().setTextAlign('right').run()"
  />
  <img
    src="/src/assets/icons/justifyText.svg"
    alt="justify icon"
    class="w-4 h-4 cursor-pointer hover:opacity-70"
    @click="editor.chain().focus().setTextAlign('justify').run()"
  />
</template>
