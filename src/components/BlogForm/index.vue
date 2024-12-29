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
import ElenmentEnd from "../ElenmentEnd.vue";
import Button from "../Button.vue";

const contentBlog = ref("");
const title = ref("");
const author = ref("");
const urlImgContentBlog = ref("");
const file = ref("");
const urlImgBlog = ref("");

const isUpload = ref(false);
const isUploadImgBLog = ref(false);

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
  return (
    !title.value.trim() ||
    !author.value ||
    !file.value ||
    !contentBlog.value.trim()
  );
});

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      paragraph: false,
    }),
    Paragraph.configure({
      HTMLAttributes: {
        class: "px-2",
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

const uploadFile = async (file, type) => {
  if (type === "imgContentBLog") {
    isUpload.value = true;
  } else {
    isUploadImgBLog.value = true;
  }
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

    if (response && type === "imgContentBLog") {
      urlImgContentBlog.value = response.data?.url;
      isUpload.value = false;
    } else {
      urlImgBlog.value = response.data?.url;
      isUploadImgBLog.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const addImage = async (e) => {
  const file = e.target.files[0];
  await uploadFile(file, "imgContentBLog");

  if (urlImgContentBlog.value !== "") {
    editor.value
      .chain()
      .focus()
      .setImage({ src: urlImgContentBlog.value })
      .run();
    isUpload.value = false;
  }
};

const addImageBlog = async (e) => {
  const fileImg = e.target.files[0];
  file.value = fileImg.name;
  isUploadImgBLog.value = false;
  await uploadFile(fileImg, "imgBLog");
};

const sendData = () => {
  const blog = {
    title: title.value,
    content: contentBlog.value,
    image: urlImgContentBlog.value,
    imageBlog: urlImgBlog.value,
    author: author.value,
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
    <v-text-field v-model.lazy="title" label="Title blog"></v-text-field>

    <v-text-field v-model.lazy="author" label="Author"></v-text-field>
    <div class="flex gap-2 items-center">
      <label class="text-base">Image blog</label>
      <input
        type="file"
        accept="image/*"
        @change="addImageBlog"
        :disabled="isUploadImgBLog"
      />
    </div>
    <img v-if="urlImgBlog" :src="urlImgBlog" class="w-1/2 h-1/2" />

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
              :disabled="isUpload"
            />
            <img
              src="/src/assets/icons/image.svg"
              alt="image icon"
              class="w-5 h-5 cursor-pointer border"
              :class="{
                'hover:cursor-default opacity-50 ': isUpload,
                'hover:opacity-70': !isUpload,
              }"
              @click="$refs.fileInput.click()"
            />
          </div>
        </div>
      </div>
      <editor-content :editor="editor" />
    </div>

    <ElenmentEnd class="gap-2">
      <template #element>
        <Button
          variant="outlined"
          name="Back"
          name-href="home"
          :style="{ backgroundColor: transparent, color: black }"
        />
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
      </template>
    </ElenmentEnd>
  </form>
</template>

<style>
.tiptap {
  border: 1px solid #000;
  padding: 4px 0px;
}
</style>
