/*
 * Copyright (c) YumeYuka 2025.
 */

export interface MusicTrack {
    title: string;
    artist: string;
    url: string;
    cover: string;
    duration?: number;
    album?: string;
}

export interface MusicConfig {
    playlist: MusicTrack[];
    settings: {
        defaultVolume: number;
        autoPlayNext: boolean;
        loop: boolean;
        shuffle: boolean;
        hoverExpandDelay: number;
        hoverCollapseDelay: number;
        showLyrics: boolean;
        preloadNext: boolean;
    };
    theme: {
        primaryColor: string;
        backgroundOpacity: number;
        blurIntensity: number;
        borderRadius: number;
        shadowIntensity: "light" | "medium" | "strong";
    };
}

export const defaultMusicConfig: MusicConfig = {
    playlist: [
        {
            title: "Serenity",
            artist: "Ambient Dreams",
            url: "/assets/music/Bande-annonce.mp3",
            cover: "/assets/music/1.png",
            album: "Peaceful Moments",
            duration: 68,
        },
    ],

    settings: {
        defaultVolume: 50,
        autoPlayNext: true,
        loop: false,
        shuffle: false,
        hoverExpandDelay: 200,
        hoverCollapseDelay: 300,
        showLyrics: false,
        preloadNext: true,
    },

    theme: {
        primaryColor: "#4f46e5",
        backgroundOpacity: 0.95,
        blurIntensity: 10,
        borderRadius: 12,
        shadowIntensity: "medium",
    },
};

export class MusicConfigManager {
    private static instance: MusicConfigManager;
    private config: MusicConfig;

    private constructor() {
        this.config = {...defaultMusicConfig};
        this.loadConfig();
    }

    public static getInstance(): MusicConfigManager {
        if (!MusicConfigManager.instance) {
            MusicConfigManager.instance = new MusicConfigManager();
        }
        return MusicConfigManager.instance;
    }

    public getConfig(): MusicConfig {
        return this.config;
    }

    public getPlaylist(): MusicTrack[] {
        return this.config.playlist;
    }

    public getSettings() {
        return this.config.settings;
    }

    public getTheme() {
        return this.config.theme;
    }

    public updateConfig(newConfig: Partial<MusicConfig>): void {
        this.config = {...this.config, ...newConfig};
        this.saveConfig();
    }

    public addTrack(track: MusicTrack): void {
        this.config.playlist.push(track);
        this.saveConfig();
    }

    public removeTrack(index: number): void {
        if (index >= 0 && index < this.config.playlist.length) {
            this.config.playlist.splice(index, 1);
            this.saveConfig();
        }
    }

    public updateTrack(index: number, track: Partial<MusicTrack>): void {
        if (index >= 0 && index < this.config.playlist.length) {
            this.config.playlist[index] = {
                ...this.config.playlist[index],
                ...track,
            };
            this.saveConfig();
        }
    }

    public resetToDefault(): void {
        this.config = {...defaultMusicConfig};
        this.saveConfig();
    }

    public exportConfig(): string {
        return JSON.stringify(this.config, null, 2);
    }

    public importConfig(configJson: string): boolean {
        try {
            const imported = JSON.parse(configJson);
            if (imported.playlist && imported.settings && imported.theme) {
                this.config = {...defaultMusicConfig, ...imported};
                this.saveConfig();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to import config:", error);
            return false;
        }
    }

    private loadConfig(): void {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("music-player-config");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    this.config = {...defaultMusicConfig, ...parsed};
                }
            } catch (error) {
                console.warn("Failed to load music config from localStorage:", error);
            }
        }
    }

    private saveConfig(): void {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem("music-player-config", JSON.stringify(this.config));
            } catch (error) {
                console.warn("Failed to save music config to localStorage:", error);
            }
        }
    }
}

export const musicConfig = MusicConfigManager.getInstance();
