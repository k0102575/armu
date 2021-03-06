package bitcamp.java93.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java93.dao.MemberDao;
import bitcamp.java93.dao.MusicianDao;
import bitcamp.java93.domain.Musician;
import bitcamp.java93.service.MusicianService;

@Service
public class MusicianServiceImpl implements MusicianService {
  @Autowired
  MemberDao memberDao;

  @Autowired
  MusicianDao musicianDao;

  public List<Musician> listRecommand(int no) throws Exception {   
    return musicianDao.selectRecommandList(no);
  }
  
  public List<Musician> listFavor(int no) throws Exception {   
    return musicianDao.selectFavorList(no);
  }
  
  @Override
  public void favorRemove(int myNo, int muNo) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("myNo", myNo);
    valueMap.put("muNo", muNo);
    musicianDao.favorMusiRemove(valueMap);
  }
  
  @Override
  public void favorAdd(int myNo, int muNo) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("myNo", myNo);
    valueMap.put("muNo", muNo);
       musicianDao.favorMusiAdd(valueMap);
  }

  public List<Musician> listSurf(int no) throws Exception {   
    return musicianDao.surfList(no);
  }
  
  public List<Musician> listSurfFilter(String gender, int minAge, int maxAge) throws Exception {   
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("gender", gender);
    valueMap.put("minAge", minAge);
    valueMap.put("maxAge", maxAge);
    return musicianDao.selectSurfListFilter(valueMap);
  }
  
  @Override
  public List<Musician> searchMusician(int no,int locno, int mjrno, int gnrno, int indexL,int indexM,int indexG,String gender, int minAge, int maxAge) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("no", no);
    valueMap.put("locno", locno);
    valueMap.put("mjrno", mjrno);
    valueMap.put("gnrno", gnrno);
    valueMap.put("indexL", indexL);
    valueMap.put("indexM", indexM);
    valueMap.put("indexG", indexG);
    valueMap.put("gender", gender);
    valueMap.put("minAge", minAge);
    valueMap.put("maxAge", maxAge);
    return musicianDao.musicianSearch(valueMap);
  }

  public List<Musician> listBestReview() throws Exception {
    return musicianDao.selectBestReviewList();
  }

  public List<Musician> listPopular() throws Exception {
    return musicianDao.selectPopularList();
  }
  
  
  public void add(Musician musician) throws Exception {
    musicianDao.insert(musician);
  }
  
  public void updateNick(Musician musician) throws Exception {
    musicianDao.updateNick(musician);
  }
  
  public Musician getByMuno(int no) throws Exception {
    return musicianDao.selectMusiNo(no);
  }

  public void remove(int no) throws Exception {
    int count = musicianDao.delete(no);
    if (count < 1) {
      throw new Exception("회원 정보가 없습니다.");
    }
    
    try {
      count = memberDao.delete(no);
    } catch (Exception e) {}
  }
  
  public List<Musician> listSearchResult(String search) throws Exception {
    return musicianDao.selectSearchResultList(search);
  }

  public List<Musician> listPr(HashMap<String, Object> map) throws Exception {
    return musicianDao.selectPrList(map);
  }

  public List<Musician> listAppy(HashMap<String, Object> map) throws Exception {
    return musicianDao.selectAppyList(map);
  }
  
  //내 이벤트 에 매칭된 뮤지션 정보 가져오기
  public Musician myEventMatchMusician(int eNo, int myNo) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("eNo", eNo);
    valueMap.put("myNo", myNo);
    return musicianDao.selectMatchMusician(valueMap);
  }
  

}







