
<script setup lang="ts">
import AgentCrud from '../../cruds/AgentCrud'
import {Crud} from "@drax/crud-vue";
import {formatDate} from "@drax/common-front"

</script>

<template>
  <crud :entity="AgentCrud.instance">

  </crud>
</template>

<style scoped>

</style>

