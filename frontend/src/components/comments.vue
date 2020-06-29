<template>
    <div class="row" style="border: 1.5px solid 	rgb(233, 230, 230); padding: 2% 0; ">
      <div class="ostatak">
        <div style="font-size: 16px;" class="header-two">
            {{comm.ime}} {{comm.prezime}} <br>
        </div>
        <div style="font-size: 16px; margin-left: 10%;" class="header-one">
            {{comm.komentar}}  
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  props: [ 'comm'],
  
  computed: {
    timeAgo () {
      return moment(this.comm.posted_at).fromNow()
    }
  },
  
}
</script>

<style>
.ostatak{
  width: 80%;
}
.zarada{
  width: 20%;
  margin: auto;
  font-weight: bold;
  text-align: center;
  font-size: 25px;
}
  .header-one{
    text-align: left;
  }
  .header-two{
    text-align: left;
    margin-left: 5%;
  }
  .body-one{
    width: 90%;
    margin: auto;
    margin-bottom: 2%;
    text-align: left;
    color: rgb(100, 100, 100)
  }
  .footer-one{
    width: 90%;
    margin: auto;
    margin-bottom: 2%;
    font-weight: bold;
    font-size: 19px;
  }
</style>