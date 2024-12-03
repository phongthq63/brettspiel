package com.brettspiel.utils;

import lombok.SneakyThrows;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

/**
 * Created by Quach Thanh Phong
 * On 10/9/2024 - 3:32 PM
 */
public class AudioUtils {

    @SneakyThrows
    public static String getBase64EncodedAudioWave(byte[] audioData) {
        // Create an AudioInputStream from the input byte array
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(audioData);
        AudioInputStream originalAudioStream = AudioSystem.getAudioInputStream(byteArrayInputStream);
        // Define the PCM16 format we want to convert to
        AudioFormat pcm16Format = new AudioFormat(
                AudioFormat.Encoding.PCM_SIGNED,
                originalAudioStream.getFormat().getSampleRate(),
                16,
                originalAudioStream.getFormat().getChannels(),
                originalAudioStream.getFormat().getChannels() * 2,
                originalAudioStream.getFormat().getSampleRate(),
                false
        );
        // Get the PCM16 audio stream
        AudioInputStream pcm16AudioStream = AudioSystem.getAudioInputStream(pcm16Format, originalAudioStream);
        // Read the PCM16 audio data into a byte array
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = pcm16AudioStream.read(buffer)) != -1) {
            byteArrayOutputStream.write(buffer, 0, bytesRead);
        }

        return Base64.getEncoder().encodeToString(byteArrayOutputStream.toByteArray());
    }

    public static void writeWavHeader(FileOutputStream fos, int sampleRate, int dataLength) throws IOException {
        // Basic 44-byte WAV header for PCM, 1-channel, 16-bit
        byte[] header = new byte[44];
        int totalDataLen = dataLength + 36;
        int byteRate = sampleRate * 2; // 16-bit mono

        // "RIFF" chunk descriptor
        header[0] = 'R';  header[1] = 'I';  header[2] = 'F';  header[3] = 'F';
        header[4] = (byte) (totalDataLen & 0xff);
        header[5] = (byte) ((totalDataLen >> 8) & 0xff);
        header[6] = (byte) ((totalDataLen >> 16) & 0xff);
        header[7] = (byte) ((totalDataLen >> 24) & 0xff);
        header[8] = 'W';  header[9] = 'A';  header[10] = 'V';  header[11] = 'E';

        // "fmt " sub-chunk
        header[12] = 'f';  header[13] = 'm';  header[14] = 't';  header[15] = ' ';
        header[16] = 16;  // Sub-chunk size (16 for PCM)
        header[20] = 1;  // Audio format (1 for PCM)
        header[22] = 1;  // Num channels (1 for mono)
        header[24] = (byte) (sampleRate & 0xff);
        header[25] = (byte) ((sampleRate >> 8) & 0xff);
        header[26] = (byte) ((sampleRate >> 16) & 0xff);
        header[27] = (byte) ((sampleRate >> 24) & 0xff);
        header[28] = (byte) (byteRate & 0xff);
        header[29] = (byte) ((byteRate >> 8) & 0xff);
        header[30] = (byte) ((byteRate >> 16) & 0xff);
        header[31] = (byte) ((byteRate >> 24) & 0xff);
        header[32] = 2;  // Block align (2 bytes per sample for 16-bit)
        header[34] = 16; // Bits per sample (16-bit)

        // "data" sub-chunk
        header[36] = 'd';  header[37] = 'a';  header[38] = 't';  header[39] = 'a';
        header[40] = (byte) (dataLength & 0xff);
        header[41] = (byte) ((dataLength >> 8) & 0xff);
        header[42] = (byte) ((dataLength >> 16) & 0xff);
        header[43] = (byte) ((dataLength >> 24) & 0xff);

        fos.write(header, 0, 44);
    }

}
