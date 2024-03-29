package com.hoaxify.ws.file.vm;

import com.hoaxify.ws.file.FileAttachment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class FileAttachmentVM {

    private String name;

    private String fileType;

    public FileAttachmentVM(FileAttachment fileAttachment){
        this.setName(fileAttachment.getName());
        this.fileType=fileAttachment.getFileType();
    }
}
