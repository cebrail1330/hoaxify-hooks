package com.hoaxify.ws.hoax;

import com.hoaxify.ws.file.FileAttachment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

import com.hoaxify.ws.user.User;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Hoax implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(length = 1000)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

   	@ManyToOne
    private User user;

   	//orphanRemoval = true hoax silinndiğinde bununla  alakalı diğer tablolardan da veri siler
   //cascade = CascadeType.REMOVE = orphanRemoval ile aynı işi yapar
   	@OneToOne(mappedBy = "hoax", cascade = CascadeType.REMOVE)
   	private FileAttachment fileAttachment;


}
