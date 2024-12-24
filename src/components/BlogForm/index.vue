<script setup>
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import { computed, onUnmounted, ref } from "vue";
import { toast } from "vue3-toastify";

import StarterKit from "@tiptap/starter-kit";

import Menubar from "./Menubar.vue";

import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Paragraph from "@tiptap/extension-paragraph";

const contentBlog = ref("");
const title = ref("");
const urlImg = ref("");
const checkUpload = ref(true);

const emit = defineEmits(["handle-blog"]);
const props = defineProps({
  nameButton: String,
  disableButton: {
    type: [Boolean, Object],
    default: false,
  },
});

const checkSubmit = computed(() => props.disableButton);

const checkEmpty = computed(() => {
  return !title.value.trim() || !contentBlog.value.trim();
});

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      paragraph: false,
    }),
    Paragraph.configure({
      HTMLAttributes: {
        class: "px-2 text-justify",
      },
    }),

    ImageResize,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ],
  content: `<p >Enter content...</p>`,
  autofocus: true,

  onUpdate({ editor }) {
    contentBlog.value = editor.getHTML();
  },
});

const uploadFile = async (file) => {
  checkUpload.value = false;
  toast.warn("Please wait while the image is uploading...", {
    autoClose: 3000,
  });
  const CLOUD_NAME = "dehamgr2z";
  const PRESET_NAME = "my-blog";
  const FOLDER_NAME = "my-blog";

  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("upload_preset", PRESET_NAME);
  formData.append("folder", FOLDER_NAME);
  formData.append("file", file);

  try {
    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response) {
      urlImg.value = response.data?.url;
    }
  } catch (error) {
    console.log(error);
  }
};

const addImage = async (e) => {
  const file = e.target.files[0];
  await uploadFile(file);

  if (urlImg.value !== "") {
    editor.value.chain().focus().setImage({ src: urlImg.value }).run();
    checkUpload.value = true;
  }
};

const sendData = () => {
  const blog = {
    title: title.value,
    content: contentBlog.value,
    image: urlImg.value,
  };

  emit("handle-blog", blog);
};

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<template>
  <form class="space-y-2" @submit.prevent="sendData">
    <input
      v-model.lazy="title"
      placeholder="Title blog..."
      class="w-full border border-black rounded-md px-2 py-2"
    />
    <div class="border-black border py-1 px-4 rounded min-h-52 space-y-4">
      <div class="border-b border-black py-2">
        <div
          class="flex items-center gap-2 py-2 px-2 border-black border w-fit"
        >
          <Menubar :editor="editor" />
          <div>
            <input
              type="file"
              accept="image/*"
              @change="addImage"
              hidden
              ref="fileInput"
              :disabled="!checkUpload"
            />
            <img
              src="/src/assets/icons/image.svg"
              alt="image icon"
              class="w-5 h-5 cursor-pointer border"
              :class="{
                'hover:cursor-default opacity-50 ': !checkUpload,
                'hover:opacity-70': checkUpload,
              }"
              @click="$refs.fileInput.click()"
            />
          </div>
        </div>
      </div>
      <editor-content :editor="editor" />
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        :class="[
          'font-sans bg-primary-color px-4 py-1 text-white rounded-md hover:cursor-pointer',
          { 'opacity-50 cursor-default': checkSubmit || checkEmpty },
          { 'hover:opacity-60': !(checkSubmit || checkEmpty) },
        ]"
        :disabled="checkEmpty || checkSubmit"
      >
        {{ nameButton }}
      </button>
    </div>
  </form>
</template>

<style>
.tiptap {
  border: 1px solid #000;
  padding: 4px 0px;
}
</style>
