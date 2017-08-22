package bitcamp.java93.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import bitcamp.java93.domain.Notification;

public interface NotificationDao {
  List<Notification> selectNotiList(int no);
  List<Notification> selectMusiNotiList(int no);
  int insertEventPrNoti(Map<String,Object> valueMap);
  void deletePrNoti(int eno);
  int insertEventAppyNoti(Map<String,Object> valueMap);
  void insertEventAppyCancelNoti(HashMap<String, Object> valueMap);
  void insertEventEditNoti(HashMap<String, Object> valueMap);
  void insertEventDeleteNoti(HashMap<String, Object> valueMap);
}
