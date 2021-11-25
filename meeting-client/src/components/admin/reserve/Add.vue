<template>

  <div class="con">
    <div class="box">
      <el-row type="flex" class="row-bg" justify="space-between">
          
          <button type="button" class="btn btn-info btn-lg p-2">添加学习资料</button>
          <button type="button" icon="el-icon-search" class="btn btn-info p-2" @click="back()">返回</button>
      </el-row>
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="15">
          <el-input v-model="title" size="20" placeholder="请输入文章标题">
            <template slot="prepend">文章标题</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="15">
          <el-input v-model="describe" size="20" placeholder="请输入文章描述，即使第一段">
            <template slot="prepend">文章描述</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="15">
          <el-input v-model="author" size="20" placeholder="请输入编辑者姓名">
            <template slot="prepend"
              >作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者</template
            >
          </el-input>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="start">
         <button type="button" class="btn btn-info btn-lg p-1">封面图片</button>
      </el-row>
      <el-row type="flex" class="row-bg" justify="start">
        <el-upload
          :action="host+'/epidemic/uploads'"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="upload"
          accept="image/jpeg,image.jpg,image/png"
          name="pic"
          ref="my-upload"
          :limit=1
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>

      <el-row type="flex" class="row-bg" justify="start">
         <button type="button" class="btn btn-info btn-lg p-1">文章内容</button>
      </el-row>
      <!--富文本编辑器-->
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="15">
          <div class="form-group">
            <textarea
              class="form-control"
              name="content"
              id="summernote"
            ></textarea>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start">
           <button @click="submit()" type="button" class="btn btn-info btn-lg p-2">提&nbsp;&nbsp;交</button>
      </el-row>
    </div>
  </div>
</template>

<script>
import host from '../../../../config/api'
import axios from "axios";
export default {
  name: "CampusList",
  data() {
    return {
      title: "",
      author: "",
      content: "",
      maxSize: 10240000,
      maxCount: 1,
      filesArr: [],
      images: [],
      show: true,
      value: [],
      notice: "",
      describe:'',
      host:host.api
    };
  },

  mounted() {
    var that = this
    $("#summernote").summernote({
      placeholder: "请输入文章内容",
      height: 600,
      width: 855,
      callbacks: {
        onImageUpload(fileList) {
          let formData = new FormData();
          for (let file of fileList) {
            formData.append("pic", file);
          }
          console.log(this.host)
          axios.post("epidemic/uploads", formData)
            .then((res) => {
              res.data.imgUrl.forEach((url) => {
                 let path = that.host+url
                 console.log(path)
                $("#summernote").summernote("insertImage",path)});
            })
            .catch(function (error) {
              console.log(error);
            });
        },
      },
    });
  },
  methods: {
    back(){
        window.location = "#/study"
    },
    upload: function (res, file, fileList) {
      this.$message({
        type: "success",
        message: "上传成功!",
      });
      this.img = res.imgUrl[0];
      console.log(res.imgUrl[0]);
    },
    //删除刚上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //上传图片预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url);
      this.dialogVisible2 = true;
    },
    //取消上传
    clearFiles: function () {
      this.dialogVisible = false;
      this.$refs["my-upload"].clearFiles();
    },
    // change(e) {
    //   this.show = false;
    //   let files = e.target.files;
    //   if (files.length == 0) {
    //     return;
    //   }
    //   let reader, file;
    //   let images = this.images;
    //   for (let i = 0; i < files.length; i++) {
    //     file = files[i];
    //     this.filesArr.push(file);
    //     reader = new FileReader();
    //     if (file.size > this.maxSize) {
    //       continue;
    //     }
    //     reader.onload = (e) => {
    //       let img = new Image(); //document.createElement('img')
    //       img.onload = function () {
    //         let canvas = document.createElement("canvas");
    //         let ctx = canvas.getContext("2d");
    //         let w = img.width;
    //         let h = img.height;
    //         canvas.width = w;
    //         canvas.height = h;
    //         ctx.drawImage(img, 0, 0, w, h);
    //         let base64 = canvas.toDataURL();
    //         images.push(base64);
    //       };
    //       img.src = e.target.result;
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // },
    del: function (index) {
      this.filesArr.splice(index, 1);
      this.images.splice(index, 1);
      this.show = true;
    },
    submit() {
      let title = this.title;
      let describe = this.describe;
      let author = this.author;
      let img = this.img;
      let content = $("#summernote").summernote("code");
      // let param = new FormData();
      if (title === "") {
        this.$message({
          type: "info",
          message: "标题不能为空",
        });
      }else if(describe === ""){
        this.$message({
          type: "info",
          message: "文章描述不能为空",
        });
      } else if(author === "") {
        this.$message({
          type: "info",
          message: "作者不能为空",
        });
      } else if (img === "") {
        this.$message({
          type: "info",
          message: "封面图片不能为空",
        });
      } else if (content === "") {
        this.$message({
          type: "info",
          message: "内容不能为空",
        });
      } 
      else {
        // this.filesArr.forEach((file) => {
        //   param.append("pic", file);
        // });
        axios
          .post("epidemic/addArticle", {
            title: title,
            author: author,
            img: img,
            content: content,
            describe:describe
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.flag == true) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              setTimeout(()=>{
                 window.location = "#/epidemic";
              },500)
             
            } else {
              this.$message({
                type: "error",
                message:res.data.msg,
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}
.con {
  margin-left: 5%;
}
.form-control {
  font-size: 16px;
  position: relative;
  z-index: 999;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>