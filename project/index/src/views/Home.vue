<template>
  <div class="content-container">
    <template-list :list="testData"></template-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import TemplateList from '../components/TemplateList.vue';

import { useStore } from 'vuex';
import type { GlobalDataProps } from '@/stroeTypes';

// import { useList } from '@/storePinia';

export default defineComponent({
  components: {
    TemplateList,
  },
  setup() {
    const router = useRouter();
    // router.push()

    const store = useStore<GlobalDataProps>();
    const testData = computed(() => store.state.templates.data);
    // const { testData } = useList();
    return {
      testData,
    };
  },
});
</script>

<style>
.page-title {
  color: #fff;
}
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>
