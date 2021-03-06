package bitcamp.java93.control.json;

import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.java93.domain.Member;
import bitcamp.java93.domain.Notification;
import bitcamp.java93.service.NotificationService;

@RestController
@RequestMapping("/notification/")
public class NotificationControl {

  @Autowired NotificationService notificationService;

  @RequestMapping("listNoti")
  public JsonResult listNoti(HttpSession session) {

    JsonResult result = new JsonResult();
    Member loginMember = (Member)session.getAttribute("loginMember");

    if(loginMember != null) {
      try {
        List<Notification> notiList = notificationService.listNoti(loginMember.getNo());

        result.setStatus(JsonResult.SUCCESS);

        HashMap<String,Object> dataMap = new HashMap<>();
        dataMap.put("listNoti", notiList);
        result.setData(dataMap);

      } catch (Exception e) {
        e.printStackTrace();
        result.setStatus(JsonResult.ERROR);
      }
    } else {//loginMember가 없으면
      result.setStatus(JsonResult.SUCCESS);
      result.setData("browse");
    }

    return result;
  }
  
  @RequestMapping("listMusiNoti")
  public JsonResult listMusiNoti(HttpSession session) {
    JsonResult result = new JsonResult();
    try {
      HashMap<String,Object> dataMap = new HashMap<>();
      dataMap.put("listNoti",notificationService.listMusiNoti(getLoginMember(session).getNo()));

      result.setData(dataMap);
      result.setStatus(JsonResult.SUCCESS);
    } catch (Exception e) {
      result.setStatus(JsonResult.ERROR);
      e.printStackTrace();
    }
    return result;
  }
  
  
  @RequestMapping("getUnread")
  public JsonResult getUnread(HttpSession session) {
    JsonResult result = new JsonResult();
    Member loginMember = (Member)session.getAttribute("loginMember");
    int unread = 0;

    if(loginMember != null) {
      try {
        unread = notificationService.getUnread(loginMember.getNo());
        result.setStatus(JsonResult.SUCCESS);
        
      } catch (Exception e) {
        e.printStackTrace();
        result.setStatus(JsonResult.ERROR);
      }
    }
    result.setData(unread);
    return result;
  }

  @RequestMapping("getMusiUnread")
  public JsonResult getMusiUnread(HttpSession session) {
    JsonResult result = new JsonResult();
    Member loginMember = (Member)session.getAttribute("loginMember");

    try {
      int unread = notificationService.getMusiUnread(loginMember.getNo());
      result.setStatus(JsonResult.SUCCESS);
      result.setData(unread);
    } catch (Exception e) {
      e.printStackTrace();
      result.setStatus(JsonResult.ERROR);
    }

    return result;
  }
  
  @RequestMapping("setRead")
  public JsonResult setRead(int no) {
    JsonResult result = new JsonResult();

    try {
      notificationService.setRead(no);
      result.setStatus(JsonResult.SUCCESS);
    } catch (Exception e) {
      e.printStackTrace();
      result.setStatus(JsonResult.ERROR);
    }

    return result;
  }

  

  private Member getLoginMember(HttpSession session) {
    Member loginMember = (Member) session.getAttribute("loginMember");
    return loginMember;
  }
}
