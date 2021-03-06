var spno = 0,
replace = "",
sourceMovie
var fiFilenames = "",
fiMovienames = ""

  count = 0;
try {
  spno = location.href.split('?')[1].split('=')[1]
} catch (err) {}

if (spno == 0) {

  $(".musician-info-nickname").text("포트폴리오 추가")

  $('.portfolio-container').append(Handlebars.compile($('#musician-add-portfolio-template').text()))

  $("#question-btn").on('click', function() {
    $("#filter-container").toggle(0)
    $("#surf-backscreen").css('display', 'block')
    $(".container").css('position', 'fixed')
  })

  $("#introduce-add-btn").css('display', 'block');

  var today = moment().format('YYYY-MM-DD');
  $("#spec-date").val(today)

  $('#fi-photoupload').fileupload({
    url: '/portfolio/career.json',
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 설정.
    disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 400,   // 미리보기 이미지 너비
    previewMaxHeight: 400,  // 미리보기 이미지 높이 
    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
    }, 
    processalways: function(e, data) {
      var imagesDiv = $('.img-container');
      imagesDiv.prepend("<div class='profile-image" + count + " proimg'></div>")
      $(".profile-image" + count).attr('src', '')
      for (var i = 0; i < data.files.length; i++) {
        try {
          if (data.files[i].preview.toDataURL) {
            $(".profile-image" + count).append("<button type='button' class='photo-delete-btn" + count + " delbtn'><i class='fa fa-minus' aria-hidden='true'></i></button>")
            $(".profile-image" + count).css("background-image", 'url(' + data.files[i].preview.toDataURL() +')')
          }
        } catch (err) {}
      }
    },
    done: function (e, d) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
      var imlibsData = d.result;
      var file = imlibsData.data[0];
      fiFilenames += "/image/profile/" + file.filename + ","
      $(".profile-image" + count).attr('data-path', "/image/profile/" + file.filename)
      $(".photo-delete-btn" + count).attr("value", "/image/profile/" + file.filename)
      count++

      $(".movie-delete-btn").on('click', function() {
        $("iframe[data-value='"+ $(this).val() +"']").remove()
        var str = $(this).val() + ","
        fiMovienames = fiMovienames.replace(str, '')
        $(this).remove()
      })

      $(".delbtn").on('click', function() {
        /*$(".proimg[data-path='"+ $(this).attr('data-path') +"']").remove()*/
        $(".proimg[data-path='"+ $(this).val() +"']").remove()
        var str = $(this).val() + ","
        fiFilenames = fiFilenames.replace(str, '')
        $(this).remove()
      })

    }

  });  // file-upload

  clickSetting()

} else {
  $("#introduce-edit-btn").css('display', 'block');
  $("#introduce-delete-btn").css('display', 'block');

  Handlebars.registerHelper('isIndex', function(key, options) {
    if (key == "Y") {
      return options.fn(this);
    }
  }); // handelbars.helper

  $.getJSON('/portfolio/getSpec.json', 
      {"spno" : spno}, function(result) {
        var templateFn = Handlebars.compile($('#musician-info-portfolio-template').text())
        var generatedHTML = templateFn(result.data)
        var container = $('.portfolio-container')
        var html = container.html()
        container.html(html + generatedHTML)

        clickSetting()

        $("#question-btn").on('click', function() {
          $("#filter-container").toggle(0)
          $("#surf-backscreen").css('display', 'block')
          $(".container").css('position', 'fixed')
        })

        for(var i = 0; i < result.data.getSpec.list.length; i++) {
          if(result.data.getSpec.list[i].fileMap.key == "Y") {
            fiFilenames += result.data.getSpec.list[i].fileMap.value + ","
          }
        }

        for(var i = 0; i < result.data.getSpec.list.length; i++) {
          if(result.data.getSpec.list[i].fileMap.key == "N") {
            fiMovienames += result.data.getSpec.list[i].fileMap.value + ","
            sourceMovie = result.data.getSpec.list[i].fileMap.value.substring(17,28)
            $(".movie-container").append("<iframe class='profile-movie' width='800' height='800' data-value='"+ result.data.getSpec.list[i].fileMap.value + "' src='https://www.youtube.com/embed/" + sourceMovie + "?rel=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe>")
            $(".movie-container").append("<button type='button' class='movie-delete-btn' value='"+ result.data.getSpec.list[i].fileMap.value + "'><i class='fa fa-minus' aria-hidden='true'></i></button>")
          }
        }

        $('#fi-photoupload').fileupload({
          url: '/portfolio/career.json',
          dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
          sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
          singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
          autoUpload: true,        // 파일을 추가할 때 자동 업로딩 설정.
          disableImageResize: /Android(?!.*Chrome)|Opera/
          .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
          previewMaxWidth: 400,   // 미리보기 이미지 너비
          previewMaxHeight: 400,  // 미리보기 이미지 높이 
          previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
          submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
          }, 
          processalways: function(e, data) {
            var imagesDiv = $('.img-container');
            imagesDiv.prepend("<div class='profile-image" + count + " proimg'></div>")
            $(".profile-image" + count).attr('src', '')
            for (var i = 0; i < data.files.length; i++) {
              try {
                if (data.files[i].preview.toDataURL) {
                  $(".profile-image" + count).append("<button type='button' class='photo-delete-btn" + count + " delbtn'><i class='fa fa-minus' aria-hidden='true'></i></button>")
                  $(".profile-image" + count).css("background-image", 'url(' + data.files[i].preview.toDataURL() +')')
                }
              } catch (err) {}
            }
          },
          done: function (e, d) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
            var imlibsData = d.result;
            var file = imlibsData.data[0];
            fiFilenames += "/image/profile/" + file.filename + ","
            $(".profile-image" + count).attr('data-path', "/image/profile/" + file.filename)
            $(".photo-delete-btn" + count).attr("value", "/image/profile/" + file.filename)
            count++

            $(".movie-delete-btn").on('click', function() {
              $("iframe[data-value='"+ $(this).val() +"']").remove()
              var str = $(this).val() + ","
              fiMovienames = fiMovienames.replace(str, '')
              $(this).remove()
            })

            $(".delbtn").on('click', function() {
              /*$(".proimg[data-path='"+ $(this).attr('data-path') +"']").remove()*/
              $(".proimg[data-path='"+ $(this).val() +"']").remove()
              var str = $(this).val() + ","
              fiFilenames = fiFilenames.replace(str, '')
              $(this).remove()
            })
          }

        });  // file-upload


      })  // get json

} // if

function clickSetting() {

  $("#movie-text-btn").on('click', function() {
    var findStr = "https://youtu.be/"
      if ($("#movie-text").val().indexOf(findStr) != -1) {
        fiMovienames += $("#movie-text").val() + ","
        $(".movie-container").append("<iframe class='profile-movie' width='800' height='800' data-value='"+ $("#movie-text").val() + "' src='https://www.youtube.com/embed/" + $("#movie-text").val().substring(17,28) + "?rel=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe>")
        $(".movie-container").append("<button type='button' class='movie-delete-btn' value='"+ $("#movie-text").val() + "'><i class='fa fa-minus' aria-hidden='true'></i></button>")
        $("#movie-text").val('')
      } else {
        swal({
          title: "유튜브 주소를 \n\n" +
          "정확하게 입력하세요!",
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "lightseagreen",
          confirmButtonText: "확인",
          customClass: "checkSwal"
        });
        return
      }
  })

  $("#introduce-add-btn").on('click', function() {
    if($("#spec-desc").val() == "") {
      swal({
        title: "경력에 관한 내용을\n\n" +
        "작성해주세요",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "lightseagreen",
        confirmButtonText: "확인",
        customClass: "checkSwal"
      })
      return
    }

    if(fiFilenames == "" && fiMovienames == "") {
      swal({
        title: "경력을 설명할 \n\n" +
        "사진이나 동영상을 올려주세요! ",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "lightseagreen",
        confirmButtonText: "확인",
        customClass: "checkSwal"
      })
      return
    }
    $(".loader-box").show()

    $.post('/portfolio/addSpec.json', {
      'specDate': $("#spec-date").val(),
      'specDscp': $("#spec-desc").val(),
      'fiFilenames': fiFilenames,
      "fiMovienames" : fiMovienames
    }, function(result) {

      if(result.status == "success") {

        setTimeout(function() {
          $(".loader-box").hide()
          swal({
            title: "\n등록 되었습니다!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "lightseagreen",
            confirmButtonText: "확인",
            customClass: "checkSwal"
          }, function() {
            location.href="index.html"
          })
        }, 3000)

      }
    }, 'json')
  })

  $("#introduce-edit-btn").on('click', function() {
    if($("#spec-desc").val() == "") {
      swal({
        title: "경력에 관한 내용을\n\n" +
        "작성해주세요",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "lightseagreen",
        confirmButtonText: "확인",
        customClass: "checkSwal"
      })
      return
    }

    if(fiFilenames == "" && fiMovienames == "") {
      swal({
        title: "경력을 설명할 \n\n" +
        "사진이나 동영상을 올려주세요! ",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "lightseagreen",
        confirmButtonText: "확인",
        customClass: "checkSwal"
      })
      return
    }
    
    $(".loader-box").show()

    $.post('/portfolio/updateSpec.json', {
      'spno': spno,
      'specDate': $("#spec-date").val(),
      'specDscp': $("#spec-desc").val(),
      'fiFilenames': fiFilenames,
      "fiMovienames" : fiMovienames
    }, function(result) {
      if(result.status == "success") {
        setTimeout(function() {
          $(".loader-box").hide()
          swal({
            title: "\n변경 되었습니다!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "lightseagreen",
            confirmButtonText: "확인",
            customClass: "checkSwal"
          }, function() {
            location.href="index.html"
          })
        }, 3000)
      }
    }, 'json')
  })

  $("#introduce-delete-btn").on('click', function() {
    swal({
      title: "이 포트폴리오를\n\n" +
      "삭제하시겠습니까?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "lightseagreen",
      confirmButtonText: "네",
      closeOnConfirm: false,
      cancelButtonText: "아니요"
    },
    function(){
      $.post('/portfolio/deleteSpec.json', {
        'spno': spno
      }, function(result) {
        if(result.status == "success") {
          swal({
            title: "삭제에 성공했습니다",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "lightseagreen",
            confirmButtonText: "확인",
            customClass: "checkSwal"
          }, function() {
            location.href="index.html"
          });
        }
      }, 'json')
    })

  })

  $("#musician-info-prev").on('click', function() {
    location.href= "index.html"
  })

  $("#signup-cancel-btn").on('click', function() {
    $("#filter-container").toggle(0)
    $("#surf-backscreen").css('display', 'none')
    $(".container").css('position', 'relative')
  })

}



