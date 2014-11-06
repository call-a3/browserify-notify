/*jshint node: true*/
var notifier = new require('node-notifier');

var notify = function (opts) {
    opts = opts || {};
    notifier.notify(opts, function (error, response) {
        if (error) {
            console.log('node-notifier encountered an error:', error);
        } else if (response) {
            console.log('node-notifier:', response);
        }
    });
};

module.exports = function (bundler, opts) {
    var entries = Array.isArray(bundler._options.entries) ? bundler._options.entries.join(', ') : bundler._options.entries;
    
    bundler.on('bundle', function(bundle) {
		var success = true;
		notify({
			title: 'Started browserifying "' + entries + '"',
			message: "Fingers crossed...",
			category: 'transfer',
			icon: __dirname + '/assets/start.png'
		});
		bundle
        .on('error', function (error) {
            success = false;
            notify({
                title: 'Error browserifying "' + entries + '"',
                message: error.message,
                category: 'transfer.error',
                icon: __dirname + '/assets/error.png'
            });
        })
        .on('warn', function (error) {
            notify({
                title: 'Warning browserifying "' + entries + '"',
                message: error.message,
                category: 'transfer.error',
                icon: __dirname + '/assets/warn.png'
            });
        })
        .on('end', function () {
			if (success) {
				notify({
					title: 'Finished browserifying "' + entries + '"',
					message: "Job well done!",
					category: 'transfer.complete',
					icon: __dirname + '/assets/success.png'
				});
			}
		});
    });
};