<template>
  <Preview :form="formItem"></Preview>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { getExperienceArticle } from '../../../util/api';
import Preview from '../../../components/Preview.vue';
interface formType {
  id?: number;
  createTime?: string;
  type?: { label: string; value: string } | null;
  title: string;
  file?: any;
  url: string;
  content: string;
}
const formItem=ref<formType|null>(null)
const { data, error } = await getExperienceArticle()
watch(()=>data.value,(res)=>{
  console.log('res-',res)
  if (error.value) {
    console.error('请求失败：', error.value);
    return;
  }
  const { code, result } = res
   if(code===0){
    formItem.value = result;
  }
},{immediate:true})
</script>