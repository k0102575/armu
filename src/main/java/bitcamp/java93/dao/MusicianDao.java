package bitcamp.java93.dao;

import java.util.List;

import bitcamp.java93.domain.Musician;

public interface MusicianDao {
  List<Musician> selectRecommandList();
//  List<Musician> selectMajorList(int no);
}