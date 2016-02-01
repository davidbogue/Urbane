package com.surmize.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Article {

    private @Id @GeneratedValue Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String post;
    private Date date;
    private String author;
    private String backgroundImage;

    public Article(){}

    public Article(String title, String post, Date date, String author) {
        this.title = title;
        this.post = post;
        this.date = date;
        this.author = author;
    }
}
