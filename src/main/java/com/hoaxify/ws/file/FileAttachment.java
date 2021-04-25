package com.hoaxify.ws.file;

import com.hoaxify.ws.hoax.Hoax;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
@Data
@Entity

public class FileAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String fileType;

    @OneToOne
    private Hoax hoax;
}
