var UserAgent = navigator.userAgent;

if (
    !(UserAgent.match(
        /iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i,
    ) != null ||
    UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
) {
    window.location.href = 'https://ajoonamu.com/';
}