<template>
  <NoteComponent :createMode="isCreateMode" />
</template>
<script>
import NoteComponent from "@/components/NoteComponent.vue";

export default {
  name: "NoteView",
  components: { NoteComponent },
  computed: {
    isCreateMode() {
      return this.$route.meta.mode === "create";
    },
  },
};
</script>
