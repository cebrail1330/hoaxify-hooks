package com.hoaxify.ws.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@EnableScheduling
public class FileCleanUpService {

    final FileAttachmentRepository fileAttachmentRepository;
    final FileService fileService;

    public FileCleanUpService(FileAttachmentRepository fileAttachmentRepository, FileService fileService) {
        this.fileAttachmentRepository = fileAttachmentRepository;
        this.fileService = fileService;
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000) //24 saate bir çalışacak
    public void cleanupStorage() {
        Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
        List<FileAttachment> filesToBeDeleted = fileAttachmentRepository.findByDateBeforeAndHoaxIsNull(twentyFourHoursAgo);
        for (FileAttachment file : filesToBeDeleted) {
            fileService.deleteAttachmentFile(file.getName());
            fileAttachmentRepository.deleteById(file.getId());
        }
    }
}
